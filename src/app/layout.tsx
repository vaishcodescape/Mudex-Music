import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import FloatingHomeButton from "@/app/components/FloatingHomeButton";
import Providers from './components/Providers';
import Navbar from './components/Navbar';

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
          <div className="min-h-screen bg-black">
            <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-16">
                  <Navbar />
                </div>
              </div>
            </div>
            <main className="pt-16">
              {children}
            </main>
          </div>
          <FloatingHomeButton />
        </Providers>
      </body>
    </html>
  );
}
