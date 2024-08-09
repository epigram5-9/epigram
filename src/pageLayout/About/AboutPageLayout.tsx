import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import StartButton from './StartButton';

function AboutLayout() {
  return (
    <>
      <Header icon='search' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <main className='w-full h-[3000px] lg:h-[5000px] relative bg-slate-100'>
        <section className='absolute w-full h-[676px] lg:h-[900px] left-0 top-[1px] bg-stripes'>
          <div className='absolute left-1/2 transform -translate-x-1/2 top-[200px] lg:top-[320px] flex-col justify-start items-center gap-12 inline-flex'>
            <div className='flex-col justify-start items-center gap-[8px] md:gap-[24px] lg:gap-[40px] flex'>
              <div className='text-center text-zinc-700 text-[24px] md:text-[32px] lg:text-[40px] font-normal font-iropkeBatang leading-[40px] md:leading-[48px] lg:leading-[64px]'>
                나만 갖고 있기엔
                <br />
                아까운 글이 있지 않나요?
              </div>
              <div className='text-center text-zinc-600 text-[14px] md:text-[20px] lg:text-[20px] font-normal font-iropkeBatang leading-[24px] lg:leading-[28px]'>
                다른 사람들과 감정을 공유해 보세요.
              </div>
            </div>
            <StartButton>시작하기</StartButton>
          </div>
          <div className='w-full h-[74px] absolute left-1/2 transform -translate-x-1/2 top-[520px] lg:top-[742px] flex-col justify-between items-center inline-flex'>
            <div className='text-center text-slate-400 text-base font-semibold font-pretendard leading-relaxed'>더 알아보기</div>
            <div className='w-6 h-6 relative'>
              <Image src='/AboutPage/ArrowDownIcon.svg' alt='Arrow Down Icon' layout='fill' />
            </div>
          </div>
        </section>

        <section className='absolute w-[312px] md:w-[385px] lg:w-[1188px] flex-col lg:flex-row left-1/2 transform -translate-x-1/2 top-[811px] lg:top-[1289px] justify-center items-start lg:items-end gap-[40px] lg:gap-[80px] inline-flex'>
          <div className='block md:hidden lg:hidden'>
            <Image className='w-[312px] h-[210px]' src='/AboutPage/Mobile/AboutEpigram1.png' alt='Epigram Mobile' width={312} height={210} />
          </div>
          <div className='hidden md:block lg:hidden'>
            <Image className='w-[384px] h-[240px]' src='/AboutPage/Tablet/AboutEpigram1.png' alt='Epigram Tablet' width={384} height={240} />
          </div>
          <div className='hidden md:hidden lg:block'>
            <Image className='w-[744px] h-[388px]' src='/AboutPage/Desktop/AboutEpigram1.png' alt='Epigram Desktop' width={744} height={388} />
          </div>
          <div className='w-[364px] self-stretch flex-col justify-start lg:justify-end items-start gap-[16px] md:gap-[20px] lg:gap-[40px] inline-flex'>
            <div className='text-zinc-950 text-[24px] lg:text-[32px] font-bold font-pretendard leading-[32px] lg:leading-[46px]'>
              명언이나 글귀, <br />
              토막 상식들을 공유해 보세요.
            </div>
            <div className='w-[363px] text-slate-500 text-[16px] lg:text-[24px] font-medium font-pretendard leading-[26px] lg:leading-[32px]'>
              나만 알던 소중한 글들을
              <br />
              다른 사람들에게 전파하세요.
            </div>
          </div>
        </section>

        <section className='absolute w-[312px] md:w-[385px] lg:w-[1195px] flex flex-col lg:flex-row left-1/2 transform -translate-x-1/2 top-[1389px] md:top-[1421px] lg:top-[2056px] justify-center items-start lg:items-end gap-[40px] lg:gap-[80px]'>
          <div className='order-1 lg:order-2'>
            <div className='block md:hidden lg:hidden'>
              <Image className='w-[312px] h-[210px]' src='/AboutPage/Mobile/AboutEpigram2.png' alt='Epigram Mobile' width={312} height={210} />
            </div>
            <div className='hidden md:block lg:hidden'>
              <Image className='w-[384px] h-[240px]' src='/AboutPage/Tablet/AboutEpigram2.png' alt='Epigram Tablet' width={384} height={240} />
            </div>
            <div className='hidden md:hidden lg:block'>
              <Image className='w-[744px] h-[388px]' src='/AboutPage/Desktop/AboutEpigram2.png' alt='Epigram Desktop' width={744} height={388} />
            </div>
          </div>
          <div className='order-2 lg:order-1 self-stretch flex-col justify-start lg:justify-end lg:items-end gap-[16px] md:gap-[20px] lg:gap-[40px] inline-flex'>
            <div className='text-right text-zinc-950 text-[24px] lg:text-[32px] font-bold font-pretendard leading-[32px] lg:leading-[46px]'>
              감정 상태에 따라,
              <br />
              알맞은 위로를 받을 수 있어요.
            </div>
            <div className='text-right text-slate-500 text-[16px] lg:text-[24px] font-medium font-pretendard leading-[26px] lg:leading-[32px]'>태그를 통해 글을 모아 볼 수 있어요.</div>
          </div>
        </section>

        <section className='absolute w-[312px] md:w-[385px] lg:w-[1188px] flex-col lg:flex-row left-1/2 transform -translate-x-1/2 top-[1938px] md:top-[2031px] lg:top-[2825px] justify-center lg:items-end gap-[40px] lg:gap-[80px] inline-flex'>
          <div className='block md:hidden lg:hidden'>
            <Image className='w-[312px] h-[210px]' src='/AboutPage/Mobile/AboutEpigram3.png' alt='Epigram Mobile' width={312} height={210} />
          </div>
          <div className='hidden md:block lg:hidden'>
            <Image className='w-[384px] h-[240px]' src='/AboutPage/Tablet/AboutEpigram3.png' alt='Epigram Tablet' width={384} height={240} />
          </div>
          <div className='hidden md:hidden lg:block'>
            <Image className='w-[744px] h-[388px]' src='/AboutPage/Desktop/AboutEpigram3.png' alt='Epigram Desktop' width={744} height={388} />
          </div>
          <div className='w-[364px] self-stretch flex-col justify-start lg:justify-end items-start gap-[16px] md:gap-[20px] lg:gap-[40px] inline-flex'>
            <div className='text-zinc-950 text-[24px] lg:text-[32px] font-bold font-pretendard leading-[32px] lg:leading-[46px]'>
              내가 요즘 어떤 감정 상태인지
              <br />
              통계로 한눈에 볼 수 있어요.
            </div>
            <div className='w-[363px] text-slate-500 text-[16px] lg:text-[24px] font-medium font-pretendard leading-[26px] lg:leading-[32px]'>
              감정 달력으로
              <br />내 마음에 담긴 감정을 확인해보세요
            </div>
          </div>
        </section>
      </main>
      <section className='absolute w-full h-[782px] md:h-[1038px] lg:h-[1463px] left-0 top-[2521px] md:top-[2521px] lg:top-[3423px] bg-gradient-to-b from-slate-100 to-slate-200'>
        <div className='w-full h-full flex justify-center items-end pb-[100px] lg:pb-[200px]'>
          <div className='w-[312px] md:w-96 lg:w-[640px] h-[647.21px] md:h-[760px] lg:h-[1033.45px] flex flex-col justify-start items-center gap-[40px] lg:gap-[100px] inline-flex'>
            <div className='text-center text-[#050505] text-[24px] lg:text-[32px] font-bold font-pretendard leading-[32px] lg:leading-[46px]'>
              사용자들이 직접
              <br />
              인용한 에피그램들
            </div>
            <div className='block md:hidden lg:hidden'>
              <Image className='w-[312px] h-[543.21px]' src='/AboutPage/Mobile/AboutEpigram4.png' alt='Epigram Mobile' width={312} height={543.21} loading='lazy' />
            </div>
            <div className='hidden md:flex lg:hidden'>
              <Image className='w-96 h-[656px]' src='/AboutPage/Tablet/AboutEpigram4.png' alt='Epigram Tablet' width={384} height={656} loading='lazy' />
            </div>
            <div className='hidden md:hidden lg:flex'>
              <Image className='w-[640px] h-[841.45px]' src='/AboutPage/Desktop/AboutEpigram4.png' alt='Epigram Desktop' width={640} height={841.45} loading='lazy' />
            </div>
          </div>
        </div>
      </section>

      <section className='w-full h-[1040px] left-0 top-[3300px] md:top-[3538px] lg:top-[4824px] absolute bg-stripes flex-col justify-start items-start gap-6 inline-flex'>
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-start items-center gap-12 inline-flex'>
          <div className='w-[122px] h-[70px] lg:w-[184px] lg:h-[105px] relative self-closing-comp'>
            <div className='block md:hidden lg:hidden'>
              <Image src='/AboutPage/Logo/LogoLG.svg' alt='Epigram Logo' layout='fill' />
            </div>
            <div className='hidden md:block lg:hidden'>
              <Image src='/AboutPage/Logo/LogoLG.svg' alt='Epigram Logo' layout='fill' />
            </div>
            <div className='hidden md:hidden lg:block'>
              <Image src='/AboutPage/Logo/LogoXL.svg' alt='Epigram Logo' layout='fill' />
            </div>
          </div>
          <StartButton>시작하기</StartButton>
        </div>
      </section>
    </>
  );
}

export default AboutLayout;
