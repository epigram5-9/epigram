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
}

function SearchResults({ results }: SearchResultsProps) {
  if (!results) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div>
      {results.list.map((item) => (
        <Link href={`/epigrams/${item.id}`} key={item.id} passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className='block'>
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
          </a>
        </Link>
      ))}
    </div>
  );
}

export default SearchResults;
