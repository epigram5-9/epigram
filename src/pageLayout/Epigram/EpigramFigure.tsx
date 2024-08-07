import Image from 'next/image';
import MoreOptionsMenu from '@/components/epigram/MoreOptionMenu';
import { EpigramFigureProps } from '@/types/epigram.types';
import useEpigramLike from '@/hooks/useEpigramLike';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import queries from '@/apis/queries';

function EpigramFigure({ epigram, currentUserId }: EpigramFigureProps) {
  const isAuthor = currentUserId === epigram.writerId;
  const { handleLikeClick } = useEpigramLike(epigram);

  const { data: latestEpigram } = useQuery({
    ...queries.epigram.getEpigram({ id: epigram.id }),
    initialData: epigram,
  });

  return (
    <div className='bg-[length:100%_2.5em] bg-[linear-gradient(#eee_.1em,transparent_.1em)] w-full flex justify-center py-6'>
      <figure className='w-80 md:w-96 lg:w-[640px] flex flex-col lg: gap-8'>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            {epigram.tags.map((tag) => (
              <Link key={tag.id} href={`/search?q=${tag.name}`} passHref>
                <span className='text-gray-400 text-base lg:text-xl font-normal cursor-pointer hover:underline'>#{tag.name}</span>
              </Link>
            ))}
          </div>
          {isAuthor && <MoreOptionsMenu epigram={epigram.id} />}
        </div>
        <blockquote>
          <p className='text-2xl lg:text-3xl font-normal'>{epigram.content}</p>
        </blockquote>
        <figcaption className='text-gray-400 text-right text-base lg:text-2xl font-normal'>-{epigram.author}-</figcaption>
        <div className='flex justify-center gap-4'>
          <Button type='button' onClick={handleLikeClick}>
            <div className='p-4 w-20 lg:w-28 h-9 lg:h-11 flex items-center justify-center gap-2 text-white rounded-full bg-black-300'>
              <Image src={latestEpigram.isLiked ? '/likeIcon.svg' : '/unlikeIcon.svg'} alt='좋아요 아이콘' width={20} height={20} className='lg:w-9 lg:h-9' />
              <p className='text-sm lg:text-xl'>{latestEpigram.likeCount}</p>
            </div>
          </Button>
          {epigram.referenceTitle && (
            <Button type='button'>
              <Link href={`${epigram.referenceUrl}`} target='_blank'>
                <div className='p-2 lg:p-4 w-32 lg:w-44 h-9 lg:h-11 flex items-center justify-around rounded-full bg-line-100'>
                  <p className='w-full text-gray-300 text-sm lg:text-xl truncate ...'>{epigram.referenceTitle}</p>
                  <Image src='/placeLink.svg' alt='링크 이미지' width={20} height={20} className='lg:w-9 lg:h-9' />
                </div>
              </Link>
            </Button>
          )}
        </div>
      </figure>
    </div>
  );
}

export default EpigramFigure;
