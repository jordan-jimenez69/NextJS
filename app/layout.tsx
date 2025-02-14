"use client"; // Cette ligne indique que ce fichier doit être exécuté côté client

import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react"; // Assurez-vous d'importer SessionProvider
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider> {/* Déplacer le SessionProvider dans un composant Client */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
