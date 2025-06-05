import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contract Tracker",
  description: "Business application for tracking contracts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:text-white`}
      >
        <nav className="bg-blue-800 text-white shadow-lg">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-4">
            <Link href="/" className="text-2xl font-bold mb-2 md:mb-0 tracking-tight">Contract Tracker</Link>
            <div className="flex space-x-1 md:space-x-6">
              <Link href="/" className="px-3 py-2 hover:bg-blue-900 rounded-md transition-colors font-medium">Dashboard</Link>
              <Link href="/contracts" className="px-3 py-2 hover:bg-blue-900 rounded-md transition-colors font-medium">Contracts</Link>
              <Link href="/contracts/new" className="px-3 py-2 hover:bg-blue-900 rounded-md transition-colors font-medium">New Contract</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto py-6 px-4 md:px-6">
          {children}
        </main>
        <footer className="bg-gray-900 text-white p-6 mt-8 shadow-inner">
          <div className="container mx-auto text-center">
            <p className="font-medium">© {new Date().getFullYear()} Contract Tracker Demo Application</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
