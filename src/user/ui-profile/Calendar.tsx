import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { subMonths } from 'date-fns';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import useMonthlyEmotionLogs from '@/hooks/useGetEmotion';
import { Emotion } from '@/types/emotion';
import ARROW_BOTTOM_ICON from '../../../public/icon/arrow-bottom-icon.svg';
import ARROW_RIGHT_ICON from '../../../public/icon/arrow-right-icon.svg';
import ARROW_LEFT_ICON from '../../../public/icon/arrow-left-icon.svg';
import useCalendar from '../../hooks/useCalendar';
import { DAY_LIST, DATE_MONTH_FIXER } from '../utill/constants';

interface CalendarProps {
  userId: number;
}

// 감정 로그 타입 지정
type EmotionType = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';

export default function Calendar({ userId }: CalendarProps) {
  const [position, setPosition] = useState<string>('bottom');
  // 캘린더 함수 호출
  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();

  // 감정 달력 객체 상태 추가
  const [emotionRequest, setEmotionRequest] = useState<Emotion>({
    userId,
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  });

  // 월별 감정 로그 조회
  const { data: monthlyEmotionLogs = [] } = useMonthlyEmotionLogs(emotionRequest);

  // 달력에 출력할 수 있게 매핑
  const emotionMap: Record<string, EmotionType> = Array.isArray(monthlyEmotionLogs)
    ? monthlyEmotionLogs.reduce<Record<string, EmotionType>>((acc, log) => {
        const date = new Date(log.createdAt);
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        acc[dateString] = log.emotion as EmotionType;
        return acc;
      }, {})
    : {};

  // '월'이 변경될 때마다 request 업데이트
  useEffect(() => {
    setEmotionRequest({
      userId,
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
    });
  }, [currentDate]);

  // 이전 달 클릭
  const handlePrevMonth = () => setCurrentDate((prevDate) => subMonths(prevDate, DATE_MONTH_FIXER));
  // 다음 달 클릭
  const handleNextMonth = () => setCurrentDate((prevDate) => subMonths(prevDate, -DATE_MONTH_FIXER));

  // 아이콘 파일 경로 매핑
  const iconPaths = {
    MOVED: '/icon/Color/HeartFaceColorIcon.svg',
    HAPPY: '/icon/Color/SmileFaceColorIcon.svg',
    WORRIED: '/icon/Color/ThinkFaceColorIcon.svg',
    SAD: '/icon/Color/SadFaceColorIcon.svg',
    ANGRY: '/icon/Color/AngryFaceColorIcon.svg',
  };

  return (
    <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] mt-[160px] space-y-0 md:mb-10 mb-5 gap-[48px]'>
      {/* 캘린더 헤더 */}
      <div className='w-full flex justify-between items-center'>
        <div className='flex w-full h-[52px] justify-between items-center'>
          <div className='text-neutral-700 text-2xl font-semibold leading-loose'>{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='flex items-center gap-1 bg-slate-100 rounded-[14px] text-center text-stone-300 text-xl'>
                필터: 감동
                <div className='w-9 h-9 relative'>
                  <Image src={ARROW_BOTTOM_ICON} alt='필터 선택' width={36} height={36} />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white'>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className='flex flex-row'>
                <DropdownMenuItem>EmotionSelector 추가 예정</DropdownMenuItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex gap-6'>
          <Button variant='default' className='p-0' onClick={handlePrevMonth}>
            <Image src={ARROW_LEFT_ICON} alt='이전' width={36} height={36} />
          </Button>
          <Button variant='default' className='p-0' onClick={handleNextMonth}>
            <Image src={ARROW_RIGHT_ICON} alt='다음' width={36} height={36} />
          </Button>
        </div>
      </div>
      {/* 캘린더 */}
      <div>
        <div className='flex'>
          {DAY_LIST.map((day) => (
            <div key={day} className='w-[91px] h-[91px] border-t border-b border-gray-100 text-stone-300 font-semibold text-2xl flex items-center justify-center'>
              {day}
            </div>
          ))}
        </div>
        {weekCalendarList.map((week, weekIndex) => (
          // TODO: index 값 Lint error. 임시로 주석 사용. 추후 수정 예정
          // eslint-disable-next-line react/no-array-index-key
          <div key={weekIndex} className='flex'>
            {week.map((day, dayIndex) => {
              // 현재 날짜와 비교
              const isToday = day === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
              const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const emotion: EmotionType = emotionMap[dateString]; // 날짜에 해당하는 감정 가져오기
              const iconPath = iconPaths[emotion]; // 해당 감정 아이콘 출력

              return (
                <div
                  // TODO: index 값 Lint error. 임시로 주석 사용. 추후 수정 예정
                  // eslint-disable-next-line react/no-array-index-key
                  key={dayIndex}
                  className={`w-[91px] h-[91px] font-semibold flex items-center justify-center ${isToday ? 'border-4 border-red-400 text-red-400' : 'border-b border-gray-100 text-stone-300'}`}
                >
                  {emotion ? (
                    <div className='flex flex-col justify-center items-center gap-2'>
                      <p>{day}</p>
                      <Image src={iconPath} alt='감정' width={36} height={36} />
                    </div>
                  ) : (
                    <p className='text-2xl'>{day}</p>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
