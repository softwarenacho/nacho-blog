import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { PostProps } from './Posts';
const TagSelector = dynamic(() => import('./TagSelector'));

export interface NewPostProps {
  post: PostProps;
  setPost: Dispatch<SetStateAction<PostProps>>;
  handleSave: () => void;
}

const NewPost = ({ post, handleSave, setPost }: NewPostProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const tags = ['quote', 'code', 'me', 'idea', 'design', 'test', 'link'];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        (80 * window.innerHeight) / 100,
      )}px`;
    }
  }, [post.content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      <input
        name='title'
        type='text'
        placeholder='Title'
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        className='h-12 text-lg pl-4 appearance-none w-full rounded'
      />
      <textarea
        ref={textareaRef}
        name='content'
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        placeholder='Write...'
        className='w-full p-2 pl-4 rounded appearance-none overflow-auto max-h-[40dvh]'
        rows={2}
      />
      <TagSelector
        tags={tags}
        selectedTag={post.tag}
        onTagSelect={(tag: string) => setPost({ ...post, tag })}
      />
      <div className='flex items-center space-x-2'>
        <label
          className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ease-in-out duration-200 ${
            !post.draft ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <input
            type='checkbox'
            checked={!post.draft}
            onChange={(e) => setPost({ ...post, draft: !e.target.checked })}
            className='hidden'
          />
          <span
            className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 ${
              !post.draft ? 'translate-x-6 bg-white' : 'translate-x-1 bg-white'
            } rounded-full`}
          />
        </label>
        <span className='text-sm font-medium text-gray-900'>
          {post.draft ? 'Draft' : 'Published'}
        </span>
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white p-4 text-xl rounded-xl shadow-lg hover:shadow-xl w-full transition duration-200 ease-in-out'
      >
        {!post.id ? 'Save' : 'Update'}
      </button>
    </form>
  );
};

export default NewPost;
