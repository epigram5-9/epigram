import React from 'react';
import Link from 'next/link';

interface Tag {
  name: string;
  id: number;
}

interface Epigram {
  likeCount: number;
  tags: Tag[];
  id: number;
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
}

interface SearchResultsProps {
  results: {
    totalCount: number;
    nextCursor: number;
    list: Epigram[];
  } | null;
  query: string;
}

function SearchResults({ results, query }: SearchResultsProps) {
  if (!results) {
    return (
      <div className='flex flex-col py-4 px-6 lg:p-6 gap-2 lg:gap-[16px]'>
        <div className='flex flex-col gap-1 md:gap-2 lg:gap-6'>
          <span className='text-black-600 font-iropkeBatang iropke-lg lg:iropke-xl'>검색 결과를 불러오는 중 문제가 발생했습니다.</span>
        </div>
      </div>
    );
  }

  const filteredResults = results.list.filter((item) => item.content.includes(query) || item.author.includes(query) || item.tags.some((tag) => tag.name.includes(query)));

  if (filteredResults.length === 0) {
    return (
      <div className='flex flex-col py-4 px-6 lg:p-6 gap-2 lg:gap-[16px]'>
        <div className='flex flex-col gap-1 md:gap-2 lg:gap-6'>
          <span className='text-black-600 font-iropkeBatang iropke-lg lg:iropke-xl'>해당 검색어에 대한 결과가 없습니다.</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {filteredResults.map((item) => (
        <Link href={`/epigrams/${item.id}`} key={item.id}>
          <div className='flex flex-col py-4 px-6 lg:p-6 gap-2 lg:gap-[16px] border-b border-gray-100'>
            <div className='flex flex-col gap-1 md:gap-2 lg:gap-6'>
              <span className='text-black-600 font-iropkeBatang iropke-lg lg:iropke-xl'>{item.content}</span>
              <span className='text-blue-400 font-iropkeBatang iropke-lg lg:iropke-xl'>- {item.author} -</span>
            </div>
            <div className='flex flex-row justify-end gap-3'>
              {item.tags.map((tag) => (
                <span key={tag.id} className='text-blue-400 font-pretendard iropke-lg lg:iropke-xl'>
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchResults;
