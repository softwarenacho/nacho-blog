'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Posts from './Posts';

const Main = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    console.log('🚀 ~ useEffect ~ clickCount:', clickCount);
    if (clickCount > 0) {
      timer = setTimeout(() => {
        setClickCount(0);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    if (newClickCount >= 7) {
      setShowAdmin(true);
    }
  };

  return (
    <div
      className='h-dvh w-full p-4 pt-24 flex flex-col justify-start'
      onClick={handleClick}
    >
      <Posts />
      {showAdmin && (
        <Link
          href='/admin'
          className='mb-4 text-blue-600 hover:underline absolute bottom-0 right-4'
        >
          Admin
        </Link>
      )}
    </div>
  );
};

export default Main;
