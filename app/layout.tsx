import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rik Dental Care Center",
  description: "State-of-the-art patient portal and AI consultation support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
