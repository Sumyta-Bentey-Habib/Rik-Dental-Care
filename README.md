#  Rik Dental Care — Web Frontend

A modern, high-performance web portal and dental practice management platform built with **Next.js 16**, **React 19**, and **TypeScript**, styled with **styled-components** and **Tailwind CSS**.

---

## 🌟 Key Features

- **🏠 Patient & Practice Portal**: Interactive home landing page showcasing services, care timelines, specialists, and verified patient reviews.
- **📊 Unified Dashboard**:
  - **Patient Mode**: View upcoming/past appointments, treatment histories, and insurance allowances.
  - **Admin / Doctor Mode**: Monitor active clinic queues, manage appointment statuses, and track revenue & patient metrics.
  - **Interactive Clinic Map**: Location guidance and clinic contact details.
- **💬 AI Dental Chat Assistant**: Real-time dental triage and consultation assistant supporting symptom checks, pricing queries, and procedure recommendations.
- **📅 Appointment Booking & Scheduling**: End-to-end appointment creation, filtering (upcoming/past/all), and status management.
- **🚨 24/7 Emergency Care Guide**: Immediate action steps and emergency triage for acute dental trauma, severe toothaches, and broken restorations.
- **👨‍⚕️ Specialists Directory**: Comprehensive doctor profiles, credentials, specializations, and direct booking integration.
- **🔐 Authentication**: Streamlined sign-in and patient registration flows with reactive session state management.

---

## 🏗️ Architecture & Project Structure

The project adopts a **Feature-Sliced / Domain-Driven Architecture** under the `src/` directory:

```text
src/
├── app/                  # Next.js App Router entry points & route definitions
│   ├── (routes)/         # /, /about, /auth, /chat, /dashboard, /emergency, /specialists
│   ├── globals.css       # Global stylesheet & Tailwind CSS imports
│   └── layout.tsx        # Root layout with Navbar, Sidebar, and Footer
├── components/           # Shared reusable components
│   ├── layout/           # Navbar, Sidebar, Footer, and Shell components
│   ├── icons/            # Custom SVG icons (Tooth, Chair, Shield, etc.)
│   ├── chatWindow/       # Reusable interactive chat widget
│   └── index.ts          # Central component barrel export
├── constants/            # Design tokens & application constants
│   ├── colors.ts         # Harmonious color tokens and RGB maps
│   ├── routes.ts         # Centralized route definitions
│   ├── breakpoints.ts    # Responsive media query breakpoints
│   ├── constants.ts      # UI copy, labels, and metadata
│   └── index.ts          # Constants barrel export
├── data/                 # Mock and initial domain data
│   ├── dummy-data.ts     # Seed profiles, appointments, and messages
│   └── index.ts          # Data barrel export
├── features/             # Domain-specific feature modules
│   ├── about/            # Clinic story, mission, and clinic values
│   ├── auth/             # Sign-in and patient registration forms
│   ├── chat/             # Dedicated AI dental assistant page
│   ├── dashboard/        # Comprehensive clinical & patient dashboard
│   ├── emergency/        # Emergency guidance & immediate action steps
│   ├── home/             # Main landing page & testimonials
│   ├── specialists/      # Doctor cards & practice staff listings
│   └── index.ts          # Features barrel export
├── hooks/                # Global React hooks
│   ├── useAppointments.ts# Appointment state, filters, and mutations
│   ├── useChat.ts        # AI triage messaging logic and responses
│   └── index.ts          # Hooks barrel export
├── types/                # Shared TypeScript interfaces & types
│   └── index.ts          # User, Appointment, Testimonial, ChatMessage
└── utils/                # Utility helpers & backward-compatible re-exports
    └── index.ts
```

---

## 🚀 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16** | Full-stack React framework with App Router & Turbopack |
| **React 19** | Modern UI rendering library using `useSyncExternalStore` & hooks |
| **TypeScript 5** | End-to-end static type safety |
| **styled-components 6** | Component-level scoped CSS with dynamic theming |
| **Tailwind CSS 4** | Utility classes & rapid layout helpers |
| **Lucide React** | Clean, accessible iconography |
| **PNPM** | Fast, disk space-efficient package manager |

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have **Node.js 20+** and **pnpm** installed:

```bash
npm install -g pnpm
```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Rik-Dental-Care
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the local development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **dev** | `pnpm dev` | Starts the Next.js development server with Hot Module Replacement |
| **build** | `pnpm build` | Compiles and optimizes the application for production |
| **start** | `pnpm start` | Runs the built production server |
| **lint** | `pnpm lint` | Runs ESLint checks across all TypeScript and TSX files |
| **typecheck** | `pnpm typecheck` | Validates TypeScript types across the entire project (`tsc --noEmit`) |

---

## 📐 Coding & Design Guidelines

- **Zero Hardcoding**: All colors, routes, and copy strings are centralized in `src/constants/` (`colors.ts`, `routes.ts`, `constants.ts`).
- **Clean Path Aliases**: Import project modules using the `@/*` alias pointing directly to `./src/*` (e.g., `@/features/*`, `@/components/*`, `@/constants/*`).
- **State Management**: Browser-backed storage states utilize `useSyncExternalStore` to maintain SSR compatibility and eliminate cascading render cycles.

---

## 📄 License

This project is private and proprietary to **Rik Dental Care**.
