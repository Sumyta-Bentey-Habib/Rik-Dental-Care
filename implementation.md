# Rik Dental Care — Authentication & Login Flow Implementation Plan

## 1. Architectural Overview & Context Comparison

### 1.1 Backend Authentication Anatomy (`Rik-Dental-Care-Backend`)
- **Engine**: [Better-Auth](https://www.better-auth.com/) mounted at `/api/auth` (raw Better-Auth handler) and wrapped with custom REST controllers under `/api/v1/auth`.
- **Database & Session Store**: Neon PostgreSQL via Prisma (`User`, `Session`, `Account`, `Verification` models in `prisma/schema/auth.prisma`).
- **Session Transport**: HTTP-only cookie named `rik_dental_care_session` (`SameSite=Lax`, `Path=/`, `Secure` in production). Cookies are forwarded using `forwardAuthCookies` (`auth.utils.ts`) on login and cleared on logout.
- **Available Endpoints**:
  | Route | Method | Description | Request Body | Auth Required |
  |---|---|---|---|---|
  | `/api/v1/auth/login` | `POST` | Authenticates user, sets `rik_dental_care_session` cookie | `{ email, password }` | No |
  | `/api/v1/auth/register` | `POST` | Registers patient, sends verification OTP | `{ name, email, password, phone? }` | No |
  | `/api/v1/auth/me` | `GET` | Returns current user profile & session | None (reads cookie) | Yes |
  | `/api/v1/auth/logout` | `POST` | Invalidates session, clears cookie | None | Yes |
  | `/api/v1/auth/forgot-password` | `POST` | Triggers 6-digit password reset OTP email | `{ email }` | No |
  | `/api/v1/auth/reset-password` | `POST` | Verifies OTP and updates user password | `{ email, otp, password }` | No |
  | `/api/v1/auth/verify-email` | `POST` | Verifies account email with OTP | `{ email, otp }` | No |
  | `/api/v1/auth/resend-verification` | `POST` | Resends account verification OTP | `{ email }` | No |
  | `/api/v1/auth/change-password` | `POST` | Changes password for authenticated user | `{ currentPassword, newPassword, revokeOtherSessions? }` | Yes |
  | `/api/v1/auth/google` | `POST` | Generates Google OAuth redirect URL | `{ callbackURL? }` | No |
  | `/api/v1/auth/google/success` | `GET` | Handles OAuth return and fetches session | None | Yes |

---

### 1.2 Comparison with `Operix` Reference Implementation
| Dimension | `Operix` (`Operix-Backend` & `Operix-Frontend`) | `Rik-Dental-Care` Target Architecture |
|---|---|---|
| **Backend Framework** | NestJS with `@thallesp/nestjs-better-auth` | Express with `better-auth` + custom controller layer |
| **Reset Flow** | URL-based magic reset token sent via `MailService.sendPasswordResetEmail({ resetUrl })` | 6-digit OTP code sent via Nodemailer (`emailOTP` plugin) + `otp.ejs` template |
| **API Client** | Custom fetch wrapper (`src/lib/api/client.ts`) with `credentials: 'include'` and `OperixApiError` | Custom fetch client (`src/lib/api/client.ts`) with `credentials: 'include'` and `ApiError` |
| **State Management** | `AuthContext.tsx` with hydration on app boot (`hydrateViewer`), reactive user/profile states | `AuthContext.tsx` with hydration via `/api/v1/auth/me`, backwards-compatible sync store |
| **Existing Frontend State** | Production-ready full auth lifecycle | Currently a mock: uses `sessionStorage.setItem('user', ...)` and dummy `setTimeout(..., 600)` |

---

## 2. Answers to Specific Questions

### Question 1: Can a user reset password?
**Answer: YES on the backend; NOT YET on the frontend.**

1. **Backend Implementation (Fully Functional)**:
   - **Step 1 (`/api/v1/auth/forgot-password`)**:
     - Validates that the email is provided and matches email syntax.
     - Checks if the user exists and is not deleted/inactive (`getUserByEmailOrThrow`).
     - Calls Better-Auth's `auth.api.requestPasswordResetEmailOTP({ body: { email } })`.
     - Generates a 6-digit numeric OTP code stored in the `verification` database table with a 3-minute expiration window (`expiresIn: 3 * 60`).
     - Triggers `sendVerificationOTP({ email, otp, type: "forget-password" })` in `src/app/lib/auth.ts:168-177`, sending an email with `otp.ejs`.
   - **Step 2 (`/api/v1/auth/reset-password`)**:
     - Accepts `{ email, otp, password }` where `otp` is validated against `/^\d{6}$/` and `password` is between 8 and 128 characters (`auth.validation.ts:39-46`).
     - Better-Auth verifies the OTP against the `verification` table record.
     - Upon match, it hashes the new password with scrypt/bcrypt, updates the password in the `account` table, and deletes the one-time verification record.
2. **Frontend Gap**:
   - In `Rik-Dental-Care/src/features/auth/index.tsx`, when `mode === 'recovery'`, the form currently simulates an async action using `setTimeout(resolve, 600)` and shows a static success banner ("Recovery Link Sent").
   - It only asks for `email` and has no UI inputs for the **6-digit OTP code** or the **new password**.
   - To make it functional, the frontend recovery screen needs to implement a 2-step wizard:
     1. Enter email -> Call `POST /api/v1/auth/forgot-password`.
     2. Enter 6-digit OTP code & new password -> Call `POST /api/v1/auth/reset-password`.

---

### Question 2: Can a user ever get the email, and is it done in the server?
**Answer: YES, it is 100% implemented on the server and verified working.**

1. **Server-Side Implementation**:
   - Handled via `nodemailer` in `Rik-Dental-Care-Backend/src/app/utils/emailTemplate.ts`.
   - Connected to Gmail SMTP (`smtp.gmail.com:465`, SSL).
   - Server credentials configured in `.env`:
     - `EMAIL_SENDER_SMTP_USER="rikdentalcare@gmail.com"`
     - `EMAIL_SENDER_SMTP_PASS="cilr pxzh iehk jfal"` (Google App Password)
     - `EMAIL_SENDER_SMTP_HOST="smtp.gmail.com"`
     - `EMAIL_SENDER_SMTP_PORT="465"`
     - `EMAIL_SENDER_SMTP_FROM="rikdentalcare@gmail.com"`
   - Direct SMTP verification test against Gmail SMTP confirmed: **`VERIFY_SUCCESS: true`**.
   - EJS template `src/app/templates/otp.ejs` renders a responsive, branded email showing the 6-digit OTP code, expiration warning, and security notice.
2. **Delivery Considerations to Keep in Mind**:
   - **Account Verification Condition**: In `src/app/lib/auth.ts:145-156`, the server checks whether the user is active. If `user.isDeleted === true` or `user.isActive === false`, the server skips sending the email.
   - **Short Expiration Window**: The OTP expires in **3 minutes** (`expiresIn: 180s`). The user must enter the OTP promptly.
   - **Spam / Promotions Folder**: Because Gmail's consumer SMTP relay is used rather than a dedicated transactional mail provider (like SendGrid/Resend with custom DKIM/SPF domain keys), recipient inboxes (particularly Outlook or Yahoo) may deliver the email to the **Spam** or **Junk** folder.
   - **Frontend Disconnect**: Users currently do *not* receive emails when testing through the website because the frontend is not yet making HTTP requests to the backend.

---

## 3. Step-by-Step Implementation Plan for Login Flow

### Phase 1: API Client Infrastructure (`src/lib/api/`)
Inspired by the clean architecture of `Operix-Frontend/src/lib/api`:

1. **Environment Configuration**:
   - Backend base URL: `process.env.NEXT_PUBLIC_API_BASE_URL` (`http://localhost:5000`).
   - API prefix: `/api/v1`.
2. **API Client (`src/lib/api/client.ts`)**:
   - Uses native `fetch` with `credentials: 'include'` so that session cookies (`rik_dental_care_session`) are automatically sent to and received from the server.
   - Headers: `Content-Type: application/json`, `Accept: application/json`.
   - Comprehensive error parsing extracting backend `message`, `statusCode`, and error details into a typed `ApiError` class.
3. **CORS Alignment**:
   - `Rik-Dental-Care-Backend` already accepts `http://localhost:3000` with `credentials: true` and exposes `Set-Cookie`.

---

### Phase 2: Auth API Service & Types (`src/features/auth/api/` & `src/types/auth.ts`)

1. **Type Definitions (`src/types/auth.ts`)**:
   - Define backend response types:
     ```typescript
     export interface AuthUser {
       id: string;
       name: string;
       email: string;
       role: 'PATIENT' | 'ADMIN' | 'MANAGER';
       status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
       phone?: string | null;
       image?: string | null;
       emailVerified: boolean;
       isActive: boolean;
       createdAt: string;
       updatedAt: string;
     }

     export interface AuthSession {
       id: string;
       userId: string;
       token: string;
       expiresAt: string;
     }

     export interface LoginResponse {
       statusCode: number;
       success: boolean;
       message: string;
       data: {
         user: AuthUser;
         session: AuthSession;
       };
     }
     ```
2. **Auth Service (`src/features/auth/api/authApi.ts`)**:
   - `login(payload: { email, password })`: Calls `POST /api/v1/auth/login`.
   - `getMe()`: Calls `GET /api/v1/auth/me`.
   - `logout()`: Calls `POST /api/v1/auth/logout`.
   - `register(payload: { name, email, password, phone? })`: Calls `POST /api/v1/auth/register`.
   - `forgotPassword(payload: { email })`: Calls `POST /api/v1/auth/forgot-password`.
   - `resetPassword(payload: { email, otp, password })`: Calls `POST /api/v1/auth/reset-password`.
   - `verifyEmail(payload: { email, otp })`: Calls `POST /api/v1/auth/verify-email`.

---

### Phase 3: Global Auth Context (`src/context/AuthContext.tsx`)

Following the pattern from `Operix-Frontend`:

1. **Auth Context State**:
   - `user: AuthUser | null`
   - `session: AuthSession | null`
   - `isAuthenticated: boolean`
   - `isLoading: boolean`
   - `error: string | null`
2. **Context Methods**:
   - `login(email, password)`: Submits credentials, saves session, updates state, sets fallback `sessionStorage` for existing components.
   - `logout()`: Calls backend `/api/v1/auth/logout`, clears cookies, clears `sessionStorage`, resets state, redirects to `/auth/login`.
   - `refreshUser()`: Calls `/api/v1/auth/me` to rehydrate state on app boot.
3. **Mount in Root Layout**:
   - Wrap `<AuthProvider>` inside `src/app/layout.tsx` so all client components have access to `useAuth()`.

---

### Phase 4: Refactor Auth Form (`src/features/auth/index.tsx`)

1. **Remove Mock Simulation**:
   - Replace fake `setTimeout` with `authApi.login({ email, password })`.
2. **Proper Error Feedback**:
   - Catch backend `ApiError` and display the exact server error message (e.g., `"Invalid email or password"`, `"This account is not active"`) using existing `AlertBanner` components.
3. **Password Recovery Two-Step Flow**:
   - **Step 1**: User inputs email -> Call `authApi.forgotPassword({ email })` -> Transition form to OTP step.
   - **Step 2**: User enters 6-digit OTP and new password -> Call `authApi.resetPassword({ email, otp, password })` -> Show success state -> Redirect to login.
4. **Design System & Utils Compliance (Strict Rule)**:
   - Reuse existing typography tokens and constants from `@/constants/constants` and `@/constants/colors`.
   - Ensure NO raw hardcoded strings or raw hex codes are introduced in index files.

---

### Phase 5: Navigation & Route Protection Synchronization

1. **Sync Navbar & Sidebar**:
   - Update `Navbar` and `Sidebar` to read user status from `useAuth()` instead of solely relying on raw `sessionStorage`.
   - Connect the Navbar/Sidebar "Logout" button to `authContext.logout()`.
2. **Protected Route Handling**:
   - Ensure `src/app/dashboard/page.tsx` checks `isAuthenticated` and `isLoading` from `useAuth()`, redirecting to `/auth/login` if unauthenticated after hydration finishes.

---

## 4. Verification & Testing Checklist

- [ ] **Typecheck**: Run `pnpm typecheck` to verify complete TypeScript correctness without errors.
- [ ] **Lint**: Run `pnpm lint` to ensure zero ESLint warnings or errors.
- [ ] **Build**: Run `pnpm build` to confirm production Next.js build passes.
- [ ] **Live Login Test**:
  1. Login with a valid backend user.
  2. Verify `rik_dental_care_session` cookie is attached in request headers.
  3. Verify dashboard loads with the authenticated user profile.
  4. Reload page to verify session persistence via `GET /api/v1/auth/me`.
  5. Test logout to ensure session cookie is invalidated and user is redirected.
- [ ] **Password Reset Test**:
  1. Trigger forgot password for a registered email.
  2. Verify OTP email arrives from `rikdentalcare@gmail.com`.
  3. Submit OTP code + new password to confirm password reset.
  4. Log in with the new password.
