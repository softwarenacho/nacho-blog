import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { PostProps } from './Posts';

export interface NewPostProps {
  newPost: PostProps;
  setNewPost: Dispatch<SetStateAction<PostProps>>;
  handleSave: () => void;
}

const NewPost = ({ newPost, handleSave, setNewPost }: NewPostProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        (80 * window.innerHeight) / 100,
      )}px`;
    }
  }, [newPost.content]);

  return (
    <>
      <input
        name='title'
        type='text'
        placeholder='Title'
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        className='h-12 text-lg pl-4 appearance-none'
      />
      <textarea
        ref={textareaRef}
        name='content'
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        placeholder='Write...'
        className='w-full p-2 rounded mb-4 appearance-none overflow-auto max-h-[50dvh]'
        rows={2}
      />
      <button
        onClick={handleSave}
        className='bg-blue-500 text-white p-4 text-xl mt-16 rounded-xl shadow-lg hover:shadow-xl'
      >
        {!newPost.id ? 'Save' : 'Update'}
      </button>
    </>
  );
};

export default NewPost;
