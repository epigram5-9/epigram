import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import _ from 'lodash';
import SEARCH_ICON from '../../../public/md.svg';

interface SearchBarProps {
  onSearch: (search: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearchRef = useRef(_.debounce((query: string) => onSearch(query), 100));

  // 컴포넌트가 언마운트 될 때 cancel 메서드로 함수 취소
  useEffect(() => {
    const debouncedSearch = debouncedSearchRef.current;
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInput(query);
    debouncedSearchRef.current(query);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debouncedSearchRef.current.flush(); // Lodash debounce의 flush 메서드를 사용하여 즉시 실행
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
