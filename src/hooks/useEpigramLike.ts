import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleEpigramLike } from '@/apis/epigram';
import { GetEpigramResponseType, GetEpigramRequestType } from '@/schema/epigram';
import { toast } from '@/components/ui/use-toast';

const useEpigramLike = (epigram: GetEpigramResponseType) => {
  const [isLiked, setIsLiked] = useState(epigram.isLiked || false);
  const [likeCount, setLikeCount] = useState(epigram.likeCount);
  const queryClient = useQueryClient();

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: (request: GetEpigramRequestType) => toggleEpigramLike(request),
    onSuccess: (updatedEpigram) => {
      setIsLiked(!isLiked);
      setLikeCount(updatedEpigram.likeCount);
      queryClient.setQueryData(['epigram', epigram.id], updatedEpigram);
    },
    onError: () => {
      toast({
        title: '좋아요 오류',
        description: '잠시 후 다시 시도해 주세요.',
        variant: 'destructive',
      });
    },
  });

  const handleLikeClick = () => {
    if (!isPending) {
      toggleLike({ id: epigram.id });
    } else {
      toast({
        title: '처리 중',
        description: '이전 요청이 처리되고 있습니다. 잠시만 기다려 주세요.',
        variant: 'default',
      });
    }
  };

  return { likeCount, handleLikeClick, isPending };
};

export default useEpigramLike;
