import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Get a Free Professional Website for Your Business',
  description: 'Get found online, build credibility, and turn visitors into customers. Free custom-designed website for qualified businesses. Only 10 spots available.',
  keywords: ['free website', 'professional website', 'business website', 'get found online', 'grow your business', 'website design'],
  authors: [{ name: 'Kevon' }],
  openGraph: {
    title: 'Get a Free Professional Website for Your Business',
    description: 'Get found online, build credibility, and turn visitors into customers. Free custom-designed website. Limited to 10 businesses.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
