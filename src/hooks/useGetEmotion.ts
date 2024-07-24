import quries from '@/apis/queries';
import { GetMonthlyEmotionLogsRequestType } from '@/schema/emotion';
import { useQuery } from '@tanstack/react-query';

const useMonthlyEmotionLogs = (requset: GetMonthlyEmotionLogsRequestType) => useQuery(quries.emotion.getMonthlyEmotionLogs(requset));

export default useMonthlyEmotionLogs;
