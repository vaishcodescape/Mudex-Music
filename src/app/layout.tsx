import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import FloatingHomeButton from "@/app/components/FloatingHomeButton";
import Providers from './components/Providers';

export const metadata: Metadata = {
  title: "Mudex Music",
  description: "Elevate the Underrated",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Providers>
          {children}
          <FloatingHomeButton />
        </Providers>
      </body>
    </html>
  );
}
