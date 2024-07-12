import React from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='w-full h-[5864px] relative bg-slate-100'>
      {/* Header */}
      <div className='absolute top-[300px] w-full bg-stripes'>
        <div className='absolute left-1/2 transform -translate-x-1/2 flex-col justify-start items-center gap-12 inline-flex'>
          <div className='flex-col justify-start items-center gap-10 flex'>
            <div className='text-center text-zinc-700 text-[40px] font-normal font-iropkeBatang leading-[64px]'>
              나만 갖고 있기엔
              <br />
              아까운 글이 있지 않나요?
            </div>
            <div className='text-center text-zinc-600 text-xl font-normal font-iropkeBatang leading-7'>다른 사람들과 감정을 공유해 보세요.</div>
          </div>
          <div className='w-[286px] h-16 px-4 bg-zinc-700 rounded-xl justify-center items-center gap-2 inline-flex'>
            <div className='text-white text-xl font-semibold font-Pretendard leading-loose'>시작하기</div>
          </div>
        </div>
        <div className='w-full h-[74px] absolute left-1/2 transform -translate-x-1/2 top-[480px] flex-col justify-between items-center inline-flex'>
          <div className="text-center text-slate-400 text-base font-semibold font-['Pretendard'] leading-relaxed">더 알아보기</div>
          <div className='w-6 h-6 relative'>
            <Image src='ArrowDownIcon.svg' alt='Arrow Down Icon' layout='fill' />
          </div>
        </div>
      </div>

      <div className='w-[1188px] left-1/2 transform -translate-x-1/2 top-[1289px] absolute justify-center items-end gap-20 inline-flex'>
        <Image className='w-[744px] h-[388px]' src='/AboutEpigram1.png' alt='placeholder' width={744} height={388} />
        <div className='w-[364px] self-stretch flex-col justify-center items-start gap-10 inline-flex'>
          <div className="text-zinc-950 text-[32px] font-bold font-['Pretendard'] leading-[46px]">
            명언이나 글귀, <br />
            토막 상식들을 공유해 보세요.
          </div>
          <div className="w-[363px] text-slate-500 text-2xl font-medium font-['Pretendard'] leading-loose">
            나만 알던 소중한 글들을
            <br />
            다른 사람들에게 전파하세요.
          </div>
        </div>
      </div>

      <div className='w-[1195px] left-1/2 transform -translate-x-1/2 top-[2056px] absolute justify-center items-end gap-20 inline-flex'>
        <div className='self-stretch flex-col justify-start items-end gap-10 inline-flex'>
          <div className="text-right text-zinc-950 text-[32px] font-bold font-['Pretendard'] leading-[46px]">
            감정 상태에 따라,
            <br />
            알맞은 위로를 받을 수 있어요.
          </div>
          <div className="text-slate-500 text-2xl font-medium font-['Pretendard'] leading-loose">태그를 통해 글을 모아 볼 수 있어요.</div>
        </div>
        <Image className='w-[744px] h-[388px]' src='/AboutEpigram2.png' alt='placeholder' width={744} height={388} />
      </div>

      <div className='w-[1186px] left-1/2 transform -translate-x-1/2 top-[2825px] absolute justify-center items-end gap-20 inline-flex'>
        <Image className='w-[744px] h-[388px]' src='/AboutEpigram3.png' alt='placeholder' width={744} height={388} />
        <div className='self-stretch flex-col justify-start items-start gap-10 inline-flex'>
          <div className="text-zinc-950 text-[32px] font-bold font-['Pretendard'] leading-[46px]">
            내가 요즘 어떤 감정 상태인지
            <br />
            통계로 한눈에 볼 수 있어요.
          </div>
          <div className="w-[362px] text-slate-500 text-2xl font-medium font-['Pretendard'] leading-loose">
            감정 달력으로
            <br />내 마음에 담긴 감정을 확인해보세요
          </div>
        </div>
      </div>

      <div className='w-full h-[2063px] left-0 top-[3423px] absolute bg-gradient-to-b from-slate-100 to-slate-200' />
      <div className="w-[230px] left-1/2 transform -translate-x-1/2 top-[3693px] absolute text-center text-zinc-950 text-[32px] font-bold font-['Pretendard'] leading-[46px]">
        사용자들이 직접
        <br />
        인용한 에피그램들
      </div>
      <Image className='w-[640px] h-[786.23px] left-1/2 transform -translate-x-1/2 top-[3893px] absolute' src='/AboutEpigram4.png' alt='placeholder' width={640} height={786} />

      <div className='w-full h-[1040px] left-0 top-[4824px] absolute bg-white flex-col justify-start items-start gap-6 inline-flex'>
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-start items-center gap-12 inline-flex'>
          <div className='w-[184px] h-[105px] relative self-closing-comp'>
            <Image src='Logo/LogoXL.svg' alt='Epigram Logo' layout='fill' />
          </div>
          <div className='w-[286px] h-16 px-4 bg-zinc-700 rounded-xl justify-center items-center gap-2 inline-flex'>
            <div className='text-white text-xl font-semibold font-pretendard leading-loose'>시작하기</div>
          </div>
        </div>
      </div>
    </div>
  );
}
