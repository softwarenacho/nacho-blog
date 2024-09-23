'use client';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import Loader from './Loader';

const Card = dynamic(() => import('./Card'));

export interface PostProps {
  id: number | null;
  title: string;
  content: string;
  draft: boolean;
  tag: string;
  created_at: string;
}

const Posts = ({
  admin = false,
  setNew = () => {},
  searchInput = '',
}: {
  admin?: boolean;
  setNew?: (post: PostProps) => void;
  searchInput?: string;
}) => {
  const test = false; // TESTING FLAG

  const [posts, setPosts] = useState<PostProps[]>([]);
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');

  const apiURL = useMemo(() => {
    const baseUrl = test
      ? '/test.json'
      : `/api/posts${admin ? '?includeDrafts=true' : ''}`;
    return tag ? `${baseUrl}${admin ? '&' : '?'}tag=${tag}` : baseUrl;
  }, [test, admin, tag]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(apiURL);
      const data = await response.json();
      const sortedPosts = data.sort(
        (a: PostProps, b: PostProps) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      setPosts(sortedPosts);
    };

    fetchPosts();
  }, [apiURL]);

  const filteredPosts = useMemo(() => {
    if (!searchInput) return posts;
    if (searchInput.startsWith('#')) {
      const searchTag = searchInput.slice(1).toLowerCase();
      return posts.filter((post) => post.tag.toLowerCase().includes(searchTag));
    }
    const searchTerm = searchInput.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm),
    );
  }, [searchInput, posts]);

  return (
    <section className='flex flex-col items-center space-y-8 overflow-scroll py-4 md:px-8'>
      <Suspense fallback={<Loader />}>
        {filteredPosts.map((post) => (
          <Card key={post.id} post={post} admin={admin} setNew={setNew} />
        ))}
      </Suspense>
    </section>
  );
};

export default Posts;
