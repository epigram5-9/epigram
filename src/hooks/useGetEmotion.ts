import { useMutation } from '@tanstack/react-query';
import getEmotion from '@/apis/getEmotion';
import { EmotionType } from '@/types/emotion';

const useGetEmotion = () =>
  useMutation<EmotionType | null, Error, void>({
    mutationFn: getEmotion,
  });

export default useGetEmotion;
