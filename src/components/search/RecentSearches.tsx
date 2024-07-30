import React from 'react';

interface RecentSearchesProps {
  searches: string[];
  onSearch: (search: string) => void;
  onClear: () => void;
}

function RecentSearches({ searches, onSearch, onClear }: RecentSearchesProps) {
  const handleSearchClick = (search: string) => {
    onSearch(search);
  };

  const handleClearAll = () => {
    onClear();
  };

  return (
    <div className='flex flex-col items-start gap-4 md:gap-6 lg:gap-10 my-6 md:my-8 lg:my-10 px-6'>
      <div className='flex flex- justify-between items-center w-full'>
        <span className='text-black-700 font-pretendard pretendard-lg-medium md:pretendard-xl-medium lg:pretendard-2xl-medium'>최근 검색어</span>
        <button
          className='text-state-error font-pretendard pretendard-xs-semibold md:pretendard-md-semibold lg:pretendard-lg-semibold bg-transparent border-none cursor-pointer'
          type='button'
          onClick={handleClearAll}
        >
          모두 지우기
        </button>
      </div>
      <div className='flex flex-col items-start gap-4 md:gap-6 lg:gap-10'>
        <div className='flex flex-row flex-wrap items-start gap-2 md:gap-4 text-black-300 font-pretendard pretendard-2xl-regular'>
          {searches.map((search) => (
            <button className='flex justify-center items-center p-3 px-[14px] gap-2 rounded-[22px] bg-background-100' type='button' key={search} onClick={() => handleSearchClick(search)}>
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentSearches;
