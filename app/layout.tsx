import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Compare Game Backends - Find the Best Backend for Your Game',
    template: '%s | Compare Game Backends',
  },
  description:
    'Compare game backend platforms side-by-side. Find the best backend for your live service game with detailed feature comparisons and guides.',
  keywords: [
    'game backend comparison',
    'game backend',
    'live service game',
    'games as a service',
    'PlayFab',
    'Nakama',
    'Metaplay',
    'game server',
    'game development',
  ],
  authors: [{ name: 'Compare Game Backends' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://comparegamebackends.com',
    siteName: 'Compare Game Backends',
    title: 'Compare Game Backends - Find the Best Backend for Your Game',
    description:
      'Compare game backend platforms side-by-side. Find the best backend for your live service game.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Game Backends - Find the Best Backend for Your Game',
    description:
      'Compare game backend platforms side-by-side. Find the best backend for your live service game.',
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
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
