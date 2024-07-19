import React, { useState } from 'react';
import Image from 'next/image';
import SEARCH_ICON from '../../../public/md.svg';
import _ from 'lodash';

interface SearchBarProps {
  onSearch: (search: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
    setSearchInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex justify-between items-center h-[52px] md:h-15 lg:h-20 mt-6 mx-6 py-4 md:py-[19px] lg:py-[26px] gap-[10px] border-b-[4px] border-blue-800'>
      <input
        className='flex text-left text-black-700 text-center font-pretendard pretendard-lg-regular md:pretendard-xl-regular lg:pretendard-2xl-regular'
        placeholder='검색어를 입력해주세요.'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type='submit' className='flex justify-center items-center bg-transparent'>
        <Image className='w-5 lg:w-9 h-5 lg:h-9' src={SEARCH_ICON} alt='검색 아이콘' />
      </button>
    </form>
  );
}

export default SearchBar;
