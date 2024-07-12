import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LOGO_ICON from '../../../public/epigram-icon.png';
import ARROW_LEFT_ICON from '../../../public/icon/arrow-left-icon.svg';
import PROFILE_ICON from '../../../public/icon/profile-icon.svg';
import SEARCH_ICON from '../../../public/icon/search-icon.svg';

//TODO 네비게이션 바를 나타내는 컴포넌트 입니다.
//TODO 상위 컴포넌트에서 Props를 받아 원하는 스타일을 보여줍니다.
//TODO 사용 예시
//TODO <Header icon='back' routerPage='원하는 페이지 주소' isLogo={false} insteadOfLogo='프로필 수정' isProfileIcon={false} isButton textInButton='저장' onClick={동작할 함수} />
//TODO <Header icon='search' routerPage='/search' isLogo insteadOfLogo='' isProfileIcon isButton={false} textInButton='' onClick={() => {}} />;

interface HeaderProps {
  icon: 'back' | 'search' | '';
  routerPage: string;
  isLogo: boolean;
  insteadOfLogo: string;
  isProfileIcon: boolean;
  isButton: boolean;
  textInButton: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Header({ isLogo, icon, insteadOfLogo, isButton, isProfileIcon, textInButton, routerPage, onClick }: HeaderProps) {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <nav className='bg-white h-13 px-6 md:px-28 lg:px-30 py-4 md:py-[19px] lg:py-[26px]'>
      <div className='container flex justify-between items-center'>
        {icon === 'back' && (
          <button className='w-5 lg:w-9 h-5 lg:h-9' type='button' onClick={() => navigateTo(routerPage)} aria-label='뒤로가기 버튼'>
            <Image src={ARROW_LEFT_ICON} alt='뒤로가기 버튼 이미지' />
          </button>
        )}
        {icon === 'search' && (
          <button className='w-5 lg:w-9 h-5 lg:h-9' type='button' onClick={() => navigateTo('/search')} aria-label='검색 버튼'>
            <Image src={SEARCH_ICON} alt='검색 버튼 이미지' />
          </button>
        )}
        {isLogo && (
          <button className='flex items-center gap-2' type='button' onClick={() => navigateTo('/')} aria-label='홈으로 이동'>
            <Image className='w-5 lg:w-9 h-5 lg:h-9' src={LOGO_ICON} alt='logo' />
            <span className='text-black-700 text-6 lg:text-[26px] leading-6 font-bold'>Epigram</span>
          </button>
        )}
        {!isLogo && <span className='text-black-700 text-6 lg:text-[26px] leading-6 font-bold'>{insteadOfLogo}</span>}
        {isProfileIcon && (
          <button className='w-5 lg:w-9 h-5 lg:h-9' type='button' onClick={() => navigateTo('/mypage')} aria-label='프로필 페이지로 이동'>
            <Image src={PROFILE_ICON} alt='프로필 이미지' />
          </button>
        )}
        {isButton && (
          <button className='flex justify-center items-center h-8 lg:h-11 px-4 rounded-lg bg-black-500' type='button' onClick={onClick}>
            <span className='text-blue-100 text-xs lg:text-base font-pretendard font-semibold leading-5'>{textInButton}</span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;
