import { useMonthlyEmotionLogs } from '@/hooks/useGetEmotion';
import { Emotion } from '@/types/emotion';
import { useEffect, useState } from 'react';
import Calendar from './Calendar';
import Chart from './Chart';

interface EmotionMonthlyLogsProps {
  userId: number;
}

export default function EmotionMonthlyLogs({ userId }: EmotionMonthlyLogsProps) {
  // 현재 날짜를 상태로 관리
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // 감정 달력 객체 상태 추가
  const [emotionRequest, setEmotionRequest] = useState<Emotion>({
    userId,
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  });

  // '월'이 변경될 때마다 request 업데이트
  useEffect(() => {
    setEmotionRequest({
      userId,
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
    });
  }, [currentDate]);

  // 월별 감정 로그 조회
  const { data: monthlyEmotionLogs = [] } = useMonthlyEmotionLogs(emotionRequest);

  return (
    <>
      <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} monthlyEmotionLogs={monthlyEmotionLogs} />
      <Chart monthlyEmotionLogs={monthlyEmotionLogs} />
    </>
  );
}
