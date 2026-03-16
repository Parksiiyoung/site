import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bitnaneun — 빛나는',
  description: "We've been making posters since May 2006.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
