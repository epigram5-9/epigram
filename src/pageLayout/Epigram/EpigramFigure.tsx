import Image from 'next/image';
import MoreOptionsMenu from '@/components/epigram/MoreOptionMenu';
import { EpigramFigureProps } from '@/types/epigram.types';

function EpigramFigure({ epigram, currentUserId }: EpigramFigureProps) {
  const isAuthor = currentUserId === epigram.writerId;
  return (
    <div className='bg-[length:100%_2.5em] bg-[linear-gradient(#eee_.1em,transparent_.1em)] w-full flex justify-center py-6'>
      <figure className='w-80 md:w-96 lg:w-[640px] flex flex-col lg: gap-8'>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            {epigram.tags.map((tag) => (
              <p key={tag.id} className='text-gray-400 text-base lg:text-xl font-normal'>
                #{tag.name}
              </p>
            ))}
          </div>
          {isAuthor && <MoreOptionsMenu />}
        </div>
        <blockquote className=''>
          <p className='text-2xl lg:text-3xl font-normal'>{epigram.content}</p>
        </blockquote>
        <figcaption className='text-gray-400 text-right text-base lg:text-2xl font-normal'>-{epigram.author}-</figcaption>
        <div className='flex justify-center gap-4'>
          <button type='button'>
            <div className='w-20 lg:w-28 h-9 lg:h-11 flex items-center justify-center  text-white rounded-full bg-black'>
              <Image src='/likeIcon.svg' alt='좋아요 아이콘' width={20} height={20} className='lg:w-9 lg:h-9' />
              <p className='text-sm lg:text-xl'>{epigram.likeCount}</p>
            </div>
          </button>
          {epigram.referenceTitle && (
            <button type='button'>
              <div className='w-32 lg:w-44 h-9 lg:h-11 flex items-center justify-center rounded-full bg-line-100'>
                <p className='text-gray-300 text-sm lg:text-xl'>{epigram.referenceTitle}</p>
                <Image src='/placeLink.svg' alt='지도링크' width={20} height={20} className='lg:w-9 lg:h-9' />
              </div>
            </button>
          )}
        </div>
      </figure>
    </div>
  );
}

export default EpigramFigure;
