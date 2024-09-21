import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';

const Header = dynamic(() => import('./_components/Header'));

export const metadata: Metadata = {
  title: 'Nacho Blog',
  description: "Nacho's blog",
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#60a5fa',
  width: 'device-width',
  initialScale: 1,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/assets/logos/180x180.webp'
        />
        <meta name='msapplication-TileColor' content='#60a5fa' />
      </head>
      <body className='antialiased relative flex justify-center items-center overflow-hidden'>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
