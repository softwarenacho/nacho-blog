import type { Metadata } from 'next';
import Header from './_components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nacho Blog',
  description: "Nacho's blog",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body className='antialiased relative flex justify-center items-center overflow-hidden'>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
