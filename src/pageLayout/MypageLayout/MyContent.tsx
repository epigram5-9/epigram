import { useEffect, useState } from 'react';
import useGetEpigrams from '@/hooks/useGetEpigrams';
import MyEpigrams from '@/user/ui-content/MyEpigrams';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { EpigramsResponse } from '@/types/epigram.types';
import { CommentResponseType } from '@/schema/comment';
import useCommentsHook from '@/hooks/useCommentsHook';
import useGetMyContentHook from '@/hooks/useGetMyContentHook';
import { GetMyContentCountType } from '@/schema/user';
import MyComment from '@/user/ui-content/MyComment';
import UserInfo from '@/types/user';
import spinner from '../../../public/spinner.svg';

interface MyContentProps {
  user: UserInfo;
}

export default function MyContent({ user }: MyContentProps) {
  const limit = 3;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'epigrams' | 'comments'>('epigrams');
  const { toast } = useToast();

  /** ************ 내 에피그램/댓글 카운트 조회 ************* */
  const [totalCount, setTotalCount] = useState<GetMyContentCountType>({ epigramCount: 0, commentCount: 0 });
  const { data: count } = useGetMyContentHook({ id: user.id });
  useEffect(() => {
    if (count) {
      setTotalCount({ epigramCount: count.epigramCount, commentCount: count.commentCount });
    }
  }, [count]);

  /** ************ 내 에피그램 조회 ************* */
  const [epigramCursor, setEpigramCursor] = useState<number>(0);
  const [epigrams, setEpigrams] = useState<EpigramsResponse>({ totalCount: 0, nextCursor: null, list: [] });
  const epigramsRequest = {
    limit,
    cursor: epigramCursor,
    writerId: user.id,
  };
  const { data: epigramsData, isLoading: isEpigramsLoading, error: epigramsError } = useGetEpigrams(epigramsRequest);

  /** ************ 내 댓글 조회 ************* */
  const [commentCursor, setCommentCursor] = useState<number>(0);
  const [comments, setComments] = useState<CommentResponseType>({ totalCount: 0, nextCursor: null, list: [] });
  const commentsRequest = {
    limit,
    cursor: commentCursor,
    id: user.id,
  };
  const { data: commentData, isLoading: isCommentsLoading, error: commentsError } = useCommentsHook(commentsRequest);

  // [내 에피그램] 탭 선택 시
  useEffect(() => {
    if (selectedTab === 'epigrams' && epigramsData) {
      setEpigrams((prev) => ({
        totalCount: epigramsData.totalCount,
        nextCursor: epigramsData.nextCursor,
        list: [...prev.list, ...epigramsData.list],
      }));
      setIsLoadingMore(false);
    }
  }, [epigramsData, selectedTab]);

  // [내 댓글] 탭 선택 시
  useEffect(() => {
    if (selectedTab === 'comments' && commentData) {
      setComments((prev) => ({
        totalCount: commentData.totalCount,
        nextCursor: commentData.nextCursor,
        list: [...prev.list, ...commentData.list],
      }));
      setIsLoadingMore(false);
    }
  }, [commentData, selectedTab]);

  // 더보기 버튼 클릭 시
  const handleMoreLoad = () => {
    if (selectedTab === 'epigrams' && epigrams.nextCursor) {
      setEpigramCursor(epigrams.nextCursor);
      setIsLoadingMore(true);
    } else if (selectedTab === 'comments' && comments.nextCursor) {
      setCommentCursor(comments.nextCursor);
      setIsLoadingMore(true);
    }
  };

  // [내 에피그램] [내 댓글] 탭 선택
  const handleTabClick = (tab: 'epigrams' | 'comments') => {
    setSelectedTab(tab);
    // 데이터 초기화
    if (tab === 'epigrams') {
      setEpigrams({ totalCount: 0, nextCursor: null, list: [] });
      setEpigramCursor(0);
    } else {
      setComments({ totalCount: 0, nextCursor: null, list: [] });
      setCommentCursor(0);
    }
    setIsLoadingMore(false);
  };

  // 로딩 중
  if ((isEpigramsLoading || isCommentsLoading) && !isLoadingMore) {
    return <Image src={spinner} alt='로딩중' width={200} height={200} />;
  }

  // 에러
  if (epigramsError || commentsError) {
    toast({
      description: epigramsError?.message || commentsError?.message,
      className: 'border-state-error text-state-error font-semibold',
    });
  }

  return (
    <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] gap-12'>
      <div className='inline-flex gap-6'>
        <button
          type='button'
          className={`font-semibold text-2xl ${selectedTab === 'epigrams' ? 'cursor-default text-black-600 ' : 'cursor-pointer text-neutral-400 '}`}
          onClick={() => selectedTab !== 'epigrams' && handleTabClick('epigrams')}
          disabled={selectedTab === 'epigrams'}
        >
          내 에피그램({totalCount.epigramCount})
        </button>
        <button
          type='button'
          className={`font-semibold text-2xl ${selectedTab === 'comments' ? 'cursor-default text-black-600 ' : 'cursor-pointer text-neutral-400 '}`}
          onClick={() => selectedTab !== 'comments' && handleTabClick('comments')}
          disabled={selectedTab === 'comments'}
        >
          내 댓글({totalCount.commentCount})
        </button>
      </div>
      <div className='w-full py-[36px]'>
        <div className='flex flex-col gap-[48px]'>
          {selectedTab === 'epigrams' && <MyEpigrams epigrams={epigrams.list} totalCount={epigrams.totalCount} onMoreEpigramLoad={handleMoreLoad} />}
          {selectedTab === 'comments' && <MyComment comments={comments.list} totalCount={comments.totalCount} onMoreEpigramLoad={handleMoreLoad} />}
          {isLoadingMore && (
            <div className='w-full flex items-center justify-center lg:mt-[70px] md:mt-[50px]'>
              <Image src={spinner} alt='로딩중' width={200} height={200} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
