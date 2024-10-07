'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const tags = ['all', 'quote', 'code', 'me', 'idea', 'design', 'link'];
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    if (openMenu) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenu]);

  return (
    <header className='absolute top-0'>
      <h1 className='w-full text-blue-100 text-4xl font-bold text-center my-6'>
        <a className='appearance-none' href='/'>
          <span className='mx-4'>Nacho Blog</span>
        </a>
      </h1>
      {pathname !== '/admin' && (
        <button
          className='appearance-none fixed top-8 left-8'
          onClick={() => setOpenMenu(!openMenu)}
        >
          <Image
            src='/assets/logos/logo.svg'
            alt='Menu'
            width={32}
            height={32}
            priority={true}
          />
        </button>
      )}
      {openMenu && (
        <div
          ref={menuRef}
          className='fixed z-10 top-20 left-8 bg-[#60a5fa] border-white border shadow-lg hover:shadow-xl p-4 space-y-4 w-48 rounded-xl'
        >
          {tags.map((tag) => (
            <Link
              key={tag}
              href={tag === 'all' ? '/' : `/?tag=${tag}`}
              className='block text-blue-800 hover:underline'
              onClick={() => setOpenMenu(false)}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
