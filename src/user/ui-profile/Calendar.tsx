import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import ARROW_BOTTOM_ICON from '../../../public/icon/arrow-bottom-icon.svg';
import ARROW_RIGHT_ICON from '../../../public/icon/arrow-right-icon.svg';
import ARROW_LEFT_ICON from '../../../public/icon/arrow-left-icon.svg';

export default function Calendar() {
  const [position, setPosition] = useState('bottom');

  const calendarArray1 = [0, 1, 2, 3, 4, 5];
  const calendarArray2 = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] mt-[160px] space-y-0 md:mb-10 mb-5 gap-[48px]'>
      {/* NOTE: 캘린더 header */}
      <div className='w-full justify-between items-center inline-flex'>
        <div className='w-full h-[52px] justify-between items-center flex'>
          <div className="text-neutral-700 text-2xl font-semibold font-['Pretendard'] leading-loose">2024년 5월</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='justify-start items-center gap-1 flex bg-slate-100 rounded-[14px] ext-center text-stone-300 text-xl'>
                필터: 감동
                <div className='w-9 h-9 relative'>
                  <Image src={ARROW_BOTTOM_ICON} alt='이전' width={36} height={36} />
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
        <div className='justify-start items-start gap-6 flex'>
          <div className='w-9 h-9 relative'>
            <Image src={ARROW_LEFT_ICON} alt='이전' width={36} height={36} />
          </div>
          <div className='w-9 h-9 relative'>
            <Image src={ARROW_RIGHT_ICON} alt='이전' width={36} height={36} />
          </div>
        </div>
      </div>
      {/* NOTE: 캘린더 */}
      <div>
        {calendarArray1.map((row, rowIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`row-${rowIndex}`} className='flex'>
            {calendarArray2.map((col, colIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`row-${rowIndex}-col-${colIndex}`} className='w-[91px] h-[91px] px-[15px] py-[9px] border-b border-gray-100 text-stone-300 font-semibold flex items-center justify-center'>
                {/* 여기에 원하는 내용을 추가할 수 있습니다. */}
                {`Row ${rowIndex + 1}, Col ${colIndex + 1}`}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
