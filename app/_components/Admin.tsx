'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import { PostProps } from './Posts';

const NewPost = dynamic(() => import('../_components/NewPost'));
const Posts = dynamic(() => import('../_components/Posts'));

const emptyPost: PostProps = {
  id: null,
  title: '',
  content: '',
  created_at: '',
};

const Admin = () => {
  const [newPost, setNewPost] = useState<PostProps>(emptyPost);
  const [notification, setNotification] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [posts, setPosts] = useState<PostProps[]>([]);

  const handleSave = async () => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      const data = await response.json();
      setPosts([...posts, data]);
      setNotification('Post saved successfully!');
      setNewPost(emptyPost);
      setShowNew(false);
      setTimeout(() => {
        setNotification('');
      }, 1000);
    } else {
      const error = await response.json();
      console.error('Error saving post:', error);
    }
  };

  const handleEdit = (post: PostProps) => {
    setNewPost(post);
    setShowNew(true);
  };

  return (
    <main className='p-4 flex flex-col justify-center items-center'>
      <h1 className='text-4xl font-bold mb-6 text-center'>
        Admin Panel
        <button
          className='appearance-none drop-shadow-lg hover:drop-shadow-xl hover:scale-110 ml-4'
          onClick={() => setShowNew(!showNew)}
        >
          <Image
            className={showNew ? 'rotate-45 grayscale' : ''}
            src='/assets/icons/new.svg'
            alt='New Post'
            width={32}
            height={32}
            priority={true}
          />
        </button>
      </h1>
      {!showNew && (
        <div className='flex justify-center items-start space-x-8 max-h-[calc(100dvh-14rem)] overflow-scroll'>
          <Posts admin={true} setNew={handleEdit} />
        </div>
      )}
      {showNew && (
        <div className='flex flex-col space-y-8 max-w-xl p-8 rounded-xl border border-white bg-white w-full md:min-w-[48rem] mt-4 shadow-lg hover:shadow-xl'>
          <NewPost
            newPost={newPost}
            setNewPost={setNewPost}
            handleSave={handleSave}
          />
        </div>
      )}
      {notification && (
        <p className='text-green-500 mt-16 bg-white rounded-xl p-4'>
          {notification}
        </p>
      )}
    </main>
  );
};

export default Admin;
