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
//TODO <Header icon='back' routerPage='원하는 페이지 주소' isLogo={false} insteadOfLogo='센터 텍스트' isProfileIcon={false} isButton textInButton='버튼 텍스트' onClick={동작할 함수} />
//TODO <Header icon='search' routerPage='/search' isLogo insteadOfLogo='' isProfileIcon isButton={false} textInButton='' onClick={() => {}} />;
//TODO icon: 'back'을 사용할 경우 routerPage의 값을 무조건 지정해줘야 합니다.
//TODO isLogo={false}일 경우 insteadOfLogo의 값을 무조건 지정해줘야 합니다.
//TODO isButton 일 경우 textInButton의 값을 무조건 지정해줘야 합니다.
//TODO 중앙을 제외한 한 쪽에만 버튼이 있는 경우 스타일이 깨질 수 있으니 둘 다 없거나, 둘 다 있어야 합니다.

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
    <nav className='bg-white h-13 px-6 py-4 md:px-28 md:py-5 lg:px-30 lg:py-6'>
      <div className='container flex justify-between items-center'>
        {icon === 'back' && (
          <button className='w-5 h-5 lg:w-9 lg:h-9' type='button' onClick={() => navigateTo(routerPage)} aria-label='뒤로가기 버튼'>
            <Image src={ARROW_LEFT_ICON} alt='뒤로가기 버튼 이미지' />
          </button>
        )}
        {icon === 'search' && (
          <button className='w-5 h-5 lg:w-9 lg:h-9' type='button' onClick={() => navigateTo('/search')} aria-label='검색 버튼'>
            <Image src={SEARCH_ICON} alt='검색 버튼 이미지' />
          </button>
        )}
        {isLogo ? (
          <button className='flex items-center gap-2' type='button' onClick={() => navigateTo('/')} aria-label='홈으로 이동'>
            <Image className='w-5 h-5 lg:w-9 lg:h-9' src={LOGO_ICON} alt='logo' />
            <span className='text-black-700 text-6 lg:text-[26px] leading-6 font-bold'>Epigram</span>
          </button>
        ) : (
          <span className='text-black-700 text-6 lg:text-[26px] leading-6 font-bold'>{insteadOfLogo}</span>
        )}
        {isProfileIcon && (
          <button className='w-5 h-5 lg:w-9 lg:h-9' type='button' onClick={() => navigateTo('/mypage')} aria-label='프로필 페이지로 이동'>
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
