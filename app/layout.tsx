import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'GameBackends - Compare Game Backend Solutions',
    template: '%s | GameBackends',
  },
  description:
    'Compare game backend solutions for your project. Find the perfect backend infrastructure for your multiplayer game with detailed reviews and feature comparisons.',
  keywords: [
    'game backend',
    'multiplayer game server',
    'game server hosting',
    'PlayFab',
    'Nakama',
    'Photon',
    'game development',
  ],
  authors: [{ name: 'GameBackends' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gamebackends.com',
    siteName: 'GameBackends',
    title: 'GameBackends - Compare Game Backend Solutions',
    description:
      'Compare game backend solutions for your project. Find the perfect backend infrastructure for your multiplayer game.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GameBackends - Compare Game Backend Solutions',
    description:
      'Compare game backend solutions for your project. Find the perfect backend infrastructure for your multiplayer game.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
