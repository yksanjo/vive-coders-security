import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vive Coders Security',
  description: 'AI-powered security scanning for developers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}











