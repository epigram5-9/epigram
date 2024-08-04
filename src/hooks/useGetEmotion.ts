import quries from '@/apis/queries';
import getEmotion from '@/apis/getEmotion';
import { EmotionType } from '@/types/emotion';
import { GetMonthlyEmotionLogsRequestType } from '@/schema/emotion';
import { useQuery } from '@tanstack/react-query';

export const useMonthlyEmotionLogs = (request: GetMonthlyEmotionLogsRequestType) =>
  useQuery({
    ...quries.emotion.getMonthlyEmotionLogs(request),
    refetchOnWindowFocus: false,
    enabled: !!request,
  });

export const useGetEmotion = () =>
  useQuery<EmotionType | null, Error>({
    queryKey: ['emotion'],
    queryFn: getEmotion,
  });
