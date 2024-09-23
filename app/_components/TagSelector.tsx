interface TagSelectorProps {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

const TagSelector = ({ tags, selectedTag, onTagSelect }: TagSelectorProps) => {
  return (
    <div className='flex flex-wrap gap-2 my-2'>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={(e) => {
            e.preventDefault();
            onTagSelect(selectedTag === tag ? '' : tag);
          }}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
            ${
              selectedTag === tag
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagSelector;
