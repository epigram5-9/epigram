import { useEffect, useState } from 'react';
import useGetEpigrams from '@/hooks/useGetEpigrams';
import MyEpigrams from '@/components/mypage/MyEpigrams';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { EpigramsResponse } from '@/types/epigram.types';
import { CommentResponseType } from '@/schema/comment';
import useCommentsHook from '@/hooks/useCommentsHook';
import useGetMyContentHook from '@/hooks/useGetMyContentHook';
import MyComment from '@/components/mypage/MyComment';
import UserInfo from '@/types/user';
import useDeleteCommentMutation from '@/hooks/useDeleteCommentHook';
import { Button } from '@/components/ui/button';
import spinner from '../../../public/spinner.svg';

interface MyContentProps {
  user: UserInfo;
}

export default function MyContent({ user }: MyContentProps) {
  const limit = 3; // 한번에 불러오는 에피그램/댓글 수
  const [isLoadingMore, setIsLoadingMore] = useState(false); // 더보기 상태 관리
  const [selectedTab, setSelectedTab] = useState<'epigrams' | 'comments'>('epigrams'); // [내 에피그램] [내 댓글] 탭 선택 상태 관리
  const { toast } = useToast();

  const [epigramCount, setEpigramCount] = useState(0); // 에피그램 갯수
  const [commentCount, setCommentCount] = useState(0); // 댓글 갯수
  const [epigramCursor, setEpigramCursor] = useState<number>(0); // 더보기 조회 엔드포인트
  const [commentCursor, setCommentCursor] = useState<number>(0);
  const [epigrams, setEpigrams] = useState<EpigramsResponse>({ totalCount: 0, nextCursor: null, list: [] }); // 에피그램/댓글 목록 선언
  const [comments, setComments] = useState<CommentResponseType>({ totalCount: 0, nextCursor: null, list: [] });

  // 에피그램/댓글 갯수 조회
  const { data: count } = useGetMyContentHook({ id: user.id });
  // 목록 조회 조건
  const epigramsRequest = { limit, cursor: epigramCursor, writerId: user.id };
  const commentsRequest = { limit, cursor: commentCursor, id: user.id };

  // 데이터 조회
  const { data: epigramsData, isLoading: isEpigramsLoading, error: epigramsError } = useGetEpigrams(epigramsRequest);
  const { data: commentData, isLoading: isCommentsLoading, error: commentsError, refetch: refetchComments } = useCommentsHook(commentsRequest);

  // 카운트 출력
  useEffect(() => {
    if (count) {
      setEpigramCount(count.epigramCount);
      setCommentCount(count.commentCount);
    }
  }, [count]);

  // 에피그램 목록 출력
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

  // 댓글 출력
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

  // 댓글 수정 시 리패치
  useEffect(() => {
    if (selectedTab === 'comments') {
      refetchComments();
    }
  }, [commentCursor, selectedTab]);

  // 더보기
  const handleMoreLoad = () => {
    if (selectedTab === 'epigrams' && epigrams.nextCursor) {
      setEpigramCursor(epigrams.nextCursor);
      setIsLoadingMore(true);
    } else if (selectedTab === 'comments' && comments.nextCursor) {
      setCommentCursor(comments.nextCursor);
      setIsLoadingMore(true);
    }
  };

  // 내 에피그램 / 댓글 탭 선택 시
  const handleTabClick = (tab: 'epigrams' | 'comments') => {
    setSelectedTab(tab);
    setIsLoadingMore(false);
    if (tab === 'epigrams') {
      setEpigrams({ totalCount: 0, nextCursor: null, list: [] });
      setEpigramCursor(0);
    } else {
      setComments({ totalCount: 0, nextCursor: null, list: [] });
      setCommentCursor(0);
    }
  };

  // 댓글 삭제 훅
  const deleteCommentMutation = useDeleteCommentMutation({
    onSuccess: ({ commentId }) => {
      setComments((prev) => ({
        totalCount: prev.totalCount - 1,
        nextCursor: prev.nextCursor,
        list: prev.list.filter((comment) => comment.id !== commentId),
      }));
      setCommentCount((prev) => prev - 1);
    },
  });

  // 댓글 삭제 훅 호출
  const handleDeleteComment = async (commentId: number) => {
    deleteCommentMutation.mutate({ commentId });
  };

  // 댓글 수정
  const handleEditComment = () => {
    refetchComments();
  };

  // 에러 처리
  const handleError = (error: Error | null) => {
    if (error) {
      toast({
        description: error.message,
        className: 'border-state-error text-state-error font-semibold',
      });
    }
  };

  handleError(epigramsError);
  handleError(commentsError);

  // 로딩상태
  if ((isEpigramsLoading || isCommentsLoading) && !isLoadingMore) {
    return <Image src={spinner} alt='로딩중' width={200} height={200} />;
  }

  return (
    <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] gap-12'>
      <div className='inline-flex gap-6'>
        <Button
          className={`font-semibold text-2xl ${selectedTab === 'epigrams' ? 'cursor-default text-black-600 disabled:opacity-1 ' : 'cursor-pointer text-neutral-400'}`}
          onClick={() => selectedTab !== 'epigrams' && handleTabClick('epigrams')}
          disabled={selectedTab === 'epigrams'}
        >
          내 에피그램({epigramCount})
        </Button>
        <Button
          className={`font-semibold text-2xl ${selectedTab === 'comments' ? 'cursor-default text-black-600 disabled:opacity-1 ' : 'cursor-pointer text-neutral-400'}`}
          onClick={() => selectedTab !== 'comments' && handleTabClick('comments')}
          disabled={selectedTab === 'comments'}
        >
          내 댓글({commentCount})
        </Button>
      </div>
      <div className='w-full py-[36px]'>
        <div className='flex flex-col gap-[48px]'>
          {selectedTab === 'epigrams' && <MyEpigrams epigrams={epigrams.list} totalCount={epigrams.totalCount} onMoreEpigramLoad={handleMoreLoad} />}
          {selectedTab === 'comments' && (
            <MyComment comments={comments.list} totalCount={comments.totalCount} onMoreEpigramLoad={handleMoreLoad} onDeleteComment={handleDeleteComment} onEditComment={handleEditComment} />
          )}
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
