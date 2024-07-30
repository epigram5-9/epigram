import { useQuery } from '@tanstack/react-query';
import getEmotion from '@/apis/getEmotion';
import { EmotionType } from '@/types/emotion';

const useGetEmotion = () =>
  useQuery<EmotionType | null, Error>({
    queryKey: ['emotion'],
    queryFn: getEmotion,
  });

export default useGetEmotion;
