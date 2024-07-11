import React from 'react';

interface EpigramCardProps {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const sizeStyles = {
  sm: 'w-[286px] max-h-[132px]',
  md: 'w-[312px] max-h-[152px]',
  lg: 'w-[384px] max-h-[180px]',
  xl: 'w-[540px] max-h-[160px]',
  '2xl': 'w-[640px] max-h-[196px]',
  '3xl': 'w-[744px] max-h-[196px]',
};

function EpigramCard({ size }: EpigramCardProps) {
  return (
    <div className={`${sizeStyles[size]} relative flex-col justify-start items-end gap-2 inline-flex`}>
      <div className='h-full w-full p-[22px] bg-white rounded-[14.67px] shadow border border-zinc-100 flex-col justify-start items-start flex relative overflow-hidden'>
        {/* eslint-disable-next-line */}
        <div className='absolute inset-0 bg-stripes w-full h-full'></div> {/* 줄무늬를 만들려면 비어있는 div가 필요 */}
        <div className='relative w-full z-10 flex flex-col justify-start items-start flex-1'>
          <div className='self-stretch h-[62px] flex-col justify-start items-start gap-2 flex'>
            <div className="self-stretch text-neutral-700 text-xs font-normal font-['Iropke Batang OTF'] leading-[18px]">오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.</div>
            <div className="self-stretch text-right text-slate-400 text-xs font-normal font-['Iropke Batang OTF'] leading-[18px]">- 앙드레 말로 -</div>
          </div>
        </div>
      </div>
      <div className='justify-start items-start gap-2 inline-flex'>
        <div className="text-right text-slate-400 text-xs font-normal font-['Iropke Batang OTF'] leading-[18px]">#나아가야할때</div>
        <div className="text-right text-slate-400 text-xs font-normal font-['Iropke Batang OTF'] leading-[18px]">#꿈을이루고싶을때</div>
      </div>
    </div>
  );
}

export default EpigramCard;
