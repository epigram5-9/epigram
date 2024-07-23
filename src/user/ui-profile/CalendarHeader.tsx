import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenu } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { EmotionType } from '@/types/emotion';
import ARROW_BOTTOM_ICON from '../../../public/icon/arrow-bottom-icon.svg';
import ARROW_RIGHT_ICON from '../../../public/icon/arrow-right-icon.svg';
import ARROW_LEFT_ICON from '../../../public/icon/arrow-left-icon.svg';
import { iconPaths } from '../utill/constants';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onEmotionSelect: (emotion: EmotionType) => void;
  selectEmotion: EmotionType | null;
}

export default function CalendarHeader({ currentDate, onPrevMonth, onNextMonth, onEmotionSelect, selectEmotion }: CalendarHeaderProps) {
  return (
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
            <DropdownMenuGroup className='flex flex-row'>
              {Object.entries(iconPaths).map(([emotionKey, iconPath]) => (
                <DropdownMenuItem key={emotionKey}>
                  <Button
                    className={`p-0 w-14 h-14 bg-slate-400 bg-opacity-20 rounded-2xl flex justify-center ${selectEmotion === emotionKey ? `border-4 border-illust-yellow` : ''}`}
                    onClick={() => onEmotionSelect(emotionKey as EmotionType)}
                  >
                    <Image src={iconPath} alt='감정' width={36} height={36} />
                  </Button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='flex gap-6'>
        <Button variant='default' className='p-0' onClick={onPrevMonth}>
          <Image src={ARROW_LEFT_ICON} alt='이전' width={36} height={36} />
        </Button>
        <Button variant='default' className='p-0' onClick={onNextMonth}>
          <Image src={ARROW_RIGHT_ICON} alt='다음' width={36} height={36} />
        </Button>
      </div>
    </div>
  );
}
