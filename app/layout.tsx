import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "./providers";

export const metadata: Metadata = {
  title: "Nexus Finance — Dashboard",
  description: "FinTech dashboard with real-time analytics, Stripe payments, and MongoDB",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
