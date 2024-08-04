import { useMonthlyEmotionLogs } from '@/hooks/useGetEmotion';
import { Emotion } from '@/types/emotion';
import { useEffect, useState } from 'react';
import { useEmotionContext } from '@/context/EmotionContext';
import Calendar from '../../components/mypage/Calendar';
import Chart from '../../components/mypage/Chart';

interface EmotionMonthlyLogsProps {
  userId: number;
}

export default function EmotionMonthlyLogs({ userId }: EmotionMonthlyLogsProps) {
  // 현재 날짜를 상태로 관리
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // NOTE: 오늘의 감정 선택 시 감정 달력 및 감정 차트 동기화를 위한 context 추가
  const { shouldRefetch, setShouldRefetch } = useEmotionContext();

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
  const { data: monthlyEmotionLogs = [], refetch } = useMonthlyEmotionLogs(emotionRequest);

  useEffect(() => {
    if (shouldRefetch) {
      // 데이터 다시 조회 로직
      refetch();

      // 다시 조회 후 shouldRefetch를 false로 설정
      setShouldRefetch(false);
    }
  }, [shouldRefetch, refetch, setShouldRefetch]);

  return (
    <div className='pb-[110px]'>
      <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} monthlyEmotionLogs={monthlyEmotionLogs} />
      <Chart monthlyEmotionLogs={monthlyEmotionLogs} />
    </div>
  );
}
