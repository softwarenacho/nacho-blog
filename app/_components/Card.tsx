import formatDate from '@/lib/formatDate';
import Image from 'next/image';
import { PostProps } from './Posts';

const Card = ({
  post,
  admin,
  setNew,
}: {
  post: PostProps;
  admin: boolean;
  setNew: (post: PostProps) => void;
}) => (
  <div className='relative p-4 bg-white shadow-md rounded group hover:shadow-lg transition-shadow min-w-full md:min-w-[48rem] max-w-4xl'>
    <h2 className='text-2xl whitespace-break-spaces'>{post.title}</h2>
    <pre className='text-gray-600 whitespace-break-spaces'>{post.content}</pre>
    <span
      className={`text-gray-700 text-xs italic bg-blue-100 ${
        admin ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      } transition-opacity flex items-center justify-center rounded-lg mt-2`}
    >
      {formatDate(post.created_at)}
    </span>
    {admin && (
      <div className='absolute right-4 bottom-3'>
        <button
          className='appearence-none drop-shadow-lg hover:drop-shadow-xl hover:scale-110 bg-white border border-blue-500 rounded-full h-6 w-6 flex justify-center items-center'
          onClick={() => setNew(post)}
        >
          <Image src='/assets/edit.svg' alt='New Post' width={16} height={16} />
        </button>
      </div>
    )}
  </div>
);

export default Card;
