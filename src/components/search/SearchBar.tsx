import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SEARCH_ICON from '../../../public/md.svg';

interface SearchBarProps {
  onSearch: (search: string) => void;
  currentSearch: string;
}

function SearchBar({ onSearch, currentSearch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      setSearchInput('');
    }
  };

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  return (
    <form onSubmit={handleSubmit} className='flex justify-between items-center h-[52px] md:h-15 lg:h-20 mt-6 mx-6 py-4 md:py-[19px] lg:py-[26px] gap-[10px] border-b-[4px] border-blue-800'>
      <input
        className='flex-grow border-none text-left text-black-700 font-pretendard pretendard-lg-regular md:pretendard-xl-regular lg:pretendard-2xl-regular focus:outline-none'
        placeholder={isFocused ? '' : '검색어를 입력해주세요.'}
        value={searchInput}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button type='submit' className='flex justify-center items-center bg-transparent'>
        <Image className='w-5 lg:w-9 h-5 lg:h-9' src={SEARCH_ICON} alt='검색 아이콘' />
      </button>
    </form>
  );
}

export default SearchBar;
