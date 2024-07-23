import React, { useState } from 'react';
import Image from 'next/image';
import { subMonths } from 'date-fns';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ARROW_BOTTOM_ICON from '../../../public/icon/arrow-bottom-icon.svg';
import ARROW_RIGHT_ICON from '../../../public/icon/arrow-right-icon.svg';
import ARROW_LEFT_ICON from '../../../public/icon/arrow-left-icon.svg';
import useCalendar from '../../hooks/useCalendar';
import { DAY_LIST, DATE_MONTH_FIXER, DEFAULT_TRASH_VALUE } from '../utill/constants';

export default function Calendar() {
  const [position, setPosition] = useState<string>('bottom');
  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();

  // 이전 달 클릭
  const handlePrevMonth = () => setCurrentDate((prevDate) => subMonths(prevDate, DATE_MONTH_FIXER));
  // 다음 달 클릭
  const handleNextMonth = () => setCurrentDate((prevDate) => subMonths(prevDate, -DATE_MONTH_FIXER));

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
            <div key={day} className='w-[91px] h-[91px] px-[15px] py-[9px] border-b border-gray-100 text-stone-300 font-semibold flex items-center justify-center'>
              {day}
            </div>
          ))}
        </div>
        {weekCalendarList.map((week, weekIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={weekIndex} className='flex'>
            {week.map((day, dayIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={dayIndex} className='w-[91px] h-[91px] px-[15px] py-[9px] border-b border-gray-100 text-stone-300 font-semibold flex items-center justify-center'>
                {day === DEFAULT_TRASH_VALUE ? '' : day}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
