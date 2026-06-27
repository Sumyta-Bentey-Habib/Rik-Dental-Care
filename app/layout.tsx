import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { colors } from '../utils/colors';

export const metadata: Metadata = {
  title: 'Rik Dental Care Center',
  description: 'State-of-the-art patient portal and AI consultation support',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: colors.neutral.slate50 }}>
        <Navbar />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
