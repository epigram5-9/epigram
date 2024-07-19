import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import _ from 'lodash';
import SEARCH_ICON from '../../../public/md.svg';

interface SearchBarProps {
  onSearch: (search: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState<string>('');

  // useCallback을 사용하여 debounce 함수를 생성
  const debouncedSearch = useCallback(
    _.debounce((query) => {
      onSearch(query);
    }, 100), // 디바운스 시간 설정
    [onSearch],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInput(query);
    debouncedSearch(query);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Lodash debounce의 flush 메서드를 사용하여 즉시 실행
    debouncedSearch.flush();
  };

  return (
    <form onSubmit={handleSubmit} className='flex justify-between items-center h-[52px] md:h-15 lg:h-20 mt-6 mx-6 py-4 md:py-[19px] lg:py-[26px] gap-[10px] border-b-[4px] border-blue-800'>
      <input
        className='flex text-left text-black-700 text-center font-pretendard pretendard-lg-regular md:pretendard-xl-regular lg:pretendard-2xl-regular'
        placeholder='검색어를 입력해주세요.'
        value={searchInput}
        onChange={handleChange}
      />
      <button type='submit' className='flex justify-center items-center bg-transparent'>
        <Image className='w-5 lg:w-9 h-5 lg:h-9' src={SEARCH_ICON} alt='검색 아이콘' />
      </button>
    </form>
  );
}

export default SearchBar;
