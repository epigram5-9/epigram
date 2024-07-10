import React from 'react';
import cn from '@/lib/utils';
import Image from 'next/image';

// EmotionIconCardProps 인터페이스 정의
export interface EmotionIconCardProps {
  iconType: '감동' | '기쁨' | '고민' | '슬픔' | '분노'; // 아이콘 종류
  state: 'Default' | 'Unclicked' | 'Clicked'; // 상태
  size: 'sm' | 'md' | 'lg'; // 크기
}

// 아이콘 파일 경로 매핑
const iconPaths = {
  Color: {
    감동: 'icon/Color/HeartFaceColorIcon.svg',
    기쁨: 'icon/Color/SmileFaceColorIcon.svg',
    고민: 'icon/Color/ThinkFaceColorIcon.svg',
    슬픔: 'icon/Color/SadFaceColorIcon.svg',
    분노: 'icon/Color/AngryFaceColorIcon.svg',
  },
  BW: {
    감동: 'icon/BW/HeartFaceBWIcon.svg',
    기쁨: 'icon/BW/SmileFaceBWIcon.svg',
    고민: 'icon/BW/ThinkFaceBWIcon.svg',
    슬픔: 'icon/BW/SadFaceBWIcon.svg',
    분노: 'icon/BW/AngryFaceBWIcon.svg',
  },
};

// EmotionIconCard 컴포넌트 함수 선언
function EmotionIconCard({ iconType = '감동', state = 'Default', size = 'sm' }: EmotionIconCardProps) {
  // 크기에 따른 클래스 설정
  let sizeClass = '';
  let iconSizeClass = '';
  let textSizeClass = '';
  switch (size) {
    case 'lg':
      sizeClass = 'w-20 h-28';
      iconSizeClass = 'w-12 h-12';
      textSizeClass = 'text-base leading-relaxed';
      break;
    case 'md':
      sizeClass = 'w-16 h-24';
      iconSizeClass = 'w-10 h-10';
      textSizeClass = 'text-sm leading-normal';
      break;
    case 'sm':
    default:
      sizeClass = 'w-14 h-[84px]';
      iconSizeClass = 'w-8 h-8 p-4';
      break;
  }

  // 상태에 따른 아이콘 경로 설정
  const iconPath = state === 'Unclicked' ? iconPaths.BW[iconType] : iconPaths.Color[iconType];

  // 상태에 따른 클래스 설정
  let borderClass = '';
  let textColorClass = 'text-neutral-400';

  if (state === 'Clicked') {
    textColorClass = 'text-neutral-700';

    // iconType에 따라 다른 border 색상을 설정
    switch (iconType) {
      case '감동':
        borderClass = 'border-2 border-amber-300';
        break;
      case '기쁨':
        borderClass = 'border-2 border-emerald-400';
        break;
      case '고민':
        borderClass = 'border-2 border-indigo-400';
        break;
      case '슬픔':
        borderClass = 'border-2 border-blue-400';
        break;
      case '분노':
        borderClass = 'border-2 border-rose-400';
        break;
      default:
        borderClass = 'border-2 border-neutral-400';
        break;
    }
  }

  return (
    <div className={cn(sizeClass, 'flex-col justify-start items-center gap-2 inline-flex')}>
      <div className={cn('w-full aspect-square bg-slate-400/20 rounded-2xl justify-center items-center gap-2 inline-flex', borderClass)}>
        <Image src={iconPath} alt={iconType} width={32} height={32} className={iconSizeClass} />
      </div>
      <div className={cn('text-center font-semibold font-["Pretendard"]', textColorClass, textSizeClass)}>{iconType}</div>
    </div>
  );
}

EmotionIconCard.displayName = 'EmotionIconCard';

export { EmotionIconCard };
