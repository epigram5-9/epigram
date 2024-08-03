import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LOGO_ICON from '../../../public/epigram-icon.png';
import PROFILE_ICON from '../../../public/icon/user-icon.svg';
import MENU_ICON from '../../../public/icon/menu-icon.svg';

export default function NewHeader() {
  const router = useRouter();

  const handleNavigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className='w-full px-6 py-4 bg-white border-b border-line-100 flex items-center gap-2.5 lg:px-[120px] md:px-[72px] md:h-[60px] lg:h-20 md:py-[19px] lg:py-[26px]'>
      <div className='flex justify-between items-center w-full md:w-[744px] lg:w-[1920px]'>
        <div className='flex items-center gap-3 md:gap-6 lg:gap-9'>
          <div className='flex items-center gap-3'>
            <Image className='w-5 h-5 lg:w-9 lg:h-9 md:hidden' src={MENU_ICON} alt='logo' />
            <div className='flex items-center gap-1'>
              <Image className='w-6 h-6 lg:w-9 lg:h-9' src={LOGO_ICON} alt='logo' />
              <span className='text-black-700 text-6 lg:text-[26px] font-montserrat leading-6 font-bold'>Epigram</span>
            </div>
          </div>
          <div className='hidden md:flex items-center gap-6'>
            <button type='button' onClick={() => handleNavigateTo('/feed')}>
              <div className='text-center text-black-600 text-sm lg:text-base font-semibold font-pretendard leading-normal'>피드</div>
            </button>
            <button type='button' onClick={() => handleNavigateTo('/search')}>
              <div className='text-center text-black-600 text-sm lg:text-base font-semibold font-pretendard leading-normal'>검색</div>
            </button>
          </div>
        </div>
        <button type='button' onClick={() => handleNavigateTo('/mypage')} className='flex items-center gap-1.5'>
          <div className='w-4 h-4 lg:w-6 lg:h-6 relative'>
            <Image src={PROFILE_ICON} alt='프로필 이미지' />
          </div>
          <div className='text-gray-300 text-[13px] lg:text-sm font-medium font-pretendard leading-snug'>김코드</div>
        </button>
      </div>
    </div>
  );
}
