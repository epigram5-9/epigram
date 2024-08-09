import React, { useState } from 'react';
import Image from 'next/image';
import { subMonths, isSameMonth, isSameDay } from 'date-fns';
import { EmotionLog, EmotionTypeEN } from '@/types/emotion';
import useCalendar from '../../hooks/useCalendar';
import { DAY_LIST, DATE_MONTH_FIXER, iconPaths } from '../../user/utill/constants';
import CalendarHeader from './CalendarHeader';

interface CalendarProps {
  currentDate: Date; // 현재 날짜
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>; // 현재 날짜를 설정하는 함수
  monthlyEmotionLogs: EmotionLog[];
}

export default function Calendar({ currentDate, setCurrentDate, monthlyEmotionLogs }: CalendarProps) {
  // 캘린더 함수 호출
  const { weekCalendarList } = useCalendar(currentDate);
  // 감정 필터
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionTypeEN | null>(null);

  // 달력에 출력할 수 있게 매핑
  const emotionMap: Record<string, EmotionTypeEN> = Array.isArray(monthlyEmotionLogs)
    ? monthlyEmotionLogs.reduce<Record<string, EmotionTypeEN>>((acc, log) => {
        const date = new Date(log.createdAt);
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        acc[dateString] = log.emotion as EmotionTypeEN;
        return acc;
      }, {})
    : {};

  // 이전 달 클릭
  const handlePrevMonth = () => setCurrentDate((prevDate) => subMonths(prevDate, DATE_MONTH_FIXER));
  // 다음 달 클릭
  const handleNextMonth = () => setCurrentDate((prevDate) => subMonths(prevDate, -DATE_MONTH_FIXER));

  // 감정 필터
  const handleEmotionSelect = (emotion: EmotionTypeEN) => {
    // 현재 선택된 감정과 같으면 초기화
    if (selectedEmotion === emotion) {
      setSelectedEmotion(null);
    } else {
      setSelectedEmotion(emotion);
    }
  };

  // 필터링된 감정 맵 생성
  const filteredEmotionMap = selectedEmotion ? Object.fromEntries(Object.entries(emotionMap).filter(([, value]) => value === selectedEmotion)) : emotionMap;

  return (
    <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] mt-[160px] space-y-0 md:mb-10 mb-5 gap-[48px]'>
      {/* 캘린더 헤더 */}
      <CalendarHeader currentDate={currentDate} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} onEmotionSelect={handleEmotionSelect} selectEmotion={selectedEmotion} />
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
          // eslint-disable-next-line react/no-array-index-key
          <div key={weekIndex} className='flex'>
            {week.map((day, dayIndex) => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

              // 현재 월의 날짜인지 확인
              const isDateInCurrentMonth = isSameMonth(date, currentDate);

              // 첫 주에 7보다 큰 날짜 또는 마지막 주에 7보다 작은 날짜는 감정 출력하지 않음
              const isFirstWeek = weekIndex === 0 && day > 7;
              const isLastWeek = weekIndex === weekCalendarList.length - 1 && day < 7;

              const emotion = isDateInCurrentMonth && !isFirstWeek && !isLastWeek ? filteredEmotionMap[dateString] : undefined;
              const iconPath = emotion && iconPaths[emotion] ? iconPaths[emotion].path : '/icon/BW/SmileFaceBWIcon.svg';

              // 오늘 날짜 체크
              const isToday = isSameDay(date, new Date());

              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={dayIndex}
                  className={`w-[91px] h-[91px] font-semibold flex items-center justify-center ${isToday ? 'border-4 border-red-400 text-red-400 rounded-[3px]' : 'border-b border-gray-100 text-stone-300'}`}
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
