'use client';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import Loader from './Loader';

const Card = dynamic(() => import('./Card'));

export interface PostProps {
  id: number | null;
  title: string;
  content: string;
  created_at: string;
}

const Posts = ({
  admin = false,
  setNew = () => {},
}: {
  admin?: boolean;
  setNew?: (post: PostProps) => void;
}) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const test = true; // TESTING FLAG

  useEffect(() => {
    const fetchPosts = async () => {
      let data;
      if (test) {
        const response = await fetch('/test.json');
        data = await response.json();
      } else {
        const response = await fetch('/api/posts');
        data = await response.json();
      }
      const sortedPosts = data.sort(
        (a: PostProps, b: PostProps) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      setPosts(sortedPosts);
    };

    fetchPosts();
  }, [test]);

  return (
    <section className='flex flex-col items-center space-y-8 overflow-scroll py-4 md:px-8'>
      <Suspense fallback={<Loader />}>
        {posts.map((post) => (
          <Card key={post.id} post={post} admin={admin} setNew={setNew} />
        ))}
      </Suspense>
    </section>
  );
};

export default Posts;
