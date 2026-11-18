import type { Metadata } from 'next';
import './globals.css';
import '../components/admin/admin.css';

export const metadata: Metadata = {
  title: 'DRMHUS ORGNLS. — Built Different',
  description: 'Independent streetwear by DRMHUS ORGNLS. Discover the latest pieces.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
