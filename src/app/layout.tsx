import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { AuthProvider } from '@/components/AuthProvider';
import { RootLayoutProps } from '@/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mudex Music',
  description: 'Discover and experience music like never before',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
} 