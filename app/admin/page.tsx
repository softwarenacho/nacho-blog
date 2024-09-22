'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Admin = dynamic(() => import('../_components/Admin'));

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // false
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className='container mx-auto p-4 pt-24'>
      {!isAuthenticated ? (
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold mb-6'>Admin Login</h1>
          <form onSubmit={handleLogin} className='flex flex-col items-center'>
            <input
              type='password'
              autoComplete='password'
              placeholder='pwd'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='text-center border border-gray-300 rounded p-2 mb-4 w-20'
              required
            />
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded'
            >
              Nacho only
            </button>
          </form>
          {error && <p className='text-red-500'>{error}</p>}
        </div>
      ) : (
        <Admin />
      )}
    </div>
  );
};

export default AdminPage;
