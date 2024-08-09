// useMyContentState.ts
import { useState, useEffect } from 'react';
import useGetEpigrams from '@/hooks/useGetEpigrams';
import useCommentsHook from '@/hooks/useCommentsHook';
import useGetMyContentHook from '@/hooks/useGetMyContentHook';
import { EpigramsResponse } from '@/types/epigram.types';
import { CommentResponseType } from '@/schema/comment';
import UserInfo from '@/types/user';

export default function useMyContentState(user: UserInfo) {
  const limit = 3;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'epigrams' | 'comments'>('epigrams');
  const [epigramCount, setEpigramCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [epigramCursor, setEpigramCursor] = useState<number>(0);
  const [commentCursor, setCommentCursor] = useState<number>(0);
  const [epigrams, setEpigrams] = useState<EpigramsResponse>({ totalCount: 0, nextCursor: null, list: [] });
  const [comments, setComments] = useState<CommentResponseType>({ totalCount: 0, nextCursor: null, list: [] });

  const { data: count } = useGetMyContentHook({ id: user.id });
  const epigramsRequest = { limit, cursor: epigramCursor, writerId: user.id };
  const commentsRequest = { limit, cursor: commentCursor, id: user.id };

  const { data: epigramsData, isLoading: isEpigramsLoading, error: epigramsError } = useGetEpigrams(epigramsRequest);
  const { data: commentData, isLoading: isCommentsLoading, error: commentsError, refetch: refetchComments } = useCommentsHook(commentsRequest);

  useEffect(() => {
    if (count) {
      setEpigramCount(count.epigramCount);
      setCommentCount(count.commentCount);
    }
  }, [count]);

  useEffect(() => {
    if (selectedTab === 'epigrams' && epigramsData) {
      setEpigrams((prev) => ({
        totalCount: epigramsData.totalCount,
        nextCursor: epigramsData.nextCursor,
        list: [...prev.list.filter((epigram) => !epigramsData.list.some((newEpigram) => newEpigram.id === epigram.id)), ...epigramsData.list],
      }));
      setIsLoadingMore(false);
    }
  }, [epigramsData, selectedTab]);

  useEffect(() => {
    if (selectedTab === 'comments' && commentData) {
      setComments((prev) => ({
        totalCount: commentData.totalCount,
        nextCursor: commentData.nextCursor,
        list: [...prev.list.filter((comment) => !commentData.list.some((newComment) => newComment.id === comment.id)), ...commentData.list],
      }));
      setIsLoadingMore(false);
    }
  }, [commentData, selectedTab]);

  useEffect(() => {
    if (selectedTab === 'comments') {
      refetchComments();
    }
  }, [commentCursor, selectedTab]);

  const handleMoreLoad = () => {
    if (selectedTab === 'epigrams' && epigrams.nextCursor) {
      setEpigramCursor(epigrams.nextCursor);
      setIsLoadingMore(true);
    } else if (selectedTab === 'comments' && comments.nextCursor) {
      setCommentCursor(comments.nextCursor);
      setIsLoadingMore(true);
    }
  };

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

  return {
    isLoadingMore,
    selectedTab,
    epigramCount,
    commentCount,
    epigrams,
    comments,
    isEpigramsLoading,
    isCommentsLoading,
    epigramsError,
    commentsError,
    handleMoreLoad,
    handleTabClick,
    setCommentCount, // 추가
    setComments, // 추가
    refetchComments,
  };
}
