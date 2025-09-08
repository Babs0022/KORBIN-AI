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
      <body className={`antialiased`}>
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="KorbinAI" width={24} height={24} />
              <span className="font-semibold">KorbinAI</span>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
