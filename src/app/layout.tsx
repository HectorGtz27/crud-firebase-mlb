import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "LAB1: MLB Players CRUD",
  description: "A modern CRUD application for managing MLB players and their home run statistics with Firebase integration",
  keywords: ["MLB", "Baseball", "Players", "CRUD", "Firebase", "Next.js", "React"],
  authors: [{ name: "Hector" }],
  openGraph: {
    title: "LAB1: MLB Players CRUD",
    description: "Manage your baseball players and their home run statistics",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚾</text></svg>" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-gray-50 text-gray-900`}
      >
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
