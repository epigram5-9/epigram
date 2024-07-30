import { useMutation } from '@tanstack/react-query';
import postEmotion from '@/apis/postEmotion';
import { EmotionType } from '@/types/emotion';
import { PostEmotionResponseType } from '@/schema/emotion';

const usePostEmotion = () =>
  useMutation<PostEmotionResponseType, Error, EmotionType>({
    mutationFn: postEmotion,
  });

export default usePostEmotion;
