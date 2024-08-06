import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import X_ICON from '../../../public/icon/x-icon.svg';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const router = useRouter();

  const handleNavigateTo = (path: string) => {
    router.push(path);
    toggleSidebar();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='absolute top-0 left-0 h-full w-[220px] bg-white shadow-lg z-50'>
      <div className='h-[54px] px-4 py-2.5 bg-white border-b border-[#f2f2f2] flex items-center justify-end'>
        <button type='button' onClick={toggleSidebar}>
          <Image className='w-6 h-6' src={X_ICON} alt='사이드바 닫기' />
        </button>
      </div>
      <div className='flex flex-col'>
        <button type='button' className='w-full px-5 py-6 bg-white text-left' onClick={() => handleNavigateTo('/feed')}>
          <div className='text-[#373737] text-base font-medium font-pretendard leading-relaxed'>피드</div>
        </button>
        <button type='button' className='w-full px-5 py-6 bg-white text-left' onClick={() => handleNavigateTo('/search')}>
          <div className='text-[#373737] text-base font-medium font-pretendard leading-relaxed'>검색</div>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
