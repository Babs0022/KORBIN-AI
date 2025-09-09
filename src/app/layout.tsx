import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KorbinAI",
  description: "Autonomous workspace copilot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-app-gradient text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
