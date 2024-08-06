import React from 'react';
import Image from 'next/image';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function FAB() {
  return (
    <button
      type='button'
      onClick={scrollToTop}
      className='fixed z-10 bottom-[80px] right-6 w-12 h-12 md:w-16 md:h-16 bg-blue-900 rounded-full flex items-center justify-center shadow-lg'
      aria-label='Scroll to top'
    >
      <Image src='/icon/FAB-icon-lg.svg' alt='Scroll to top' width={24} height={24} className='w-full h-full' />
    </button>
  );
}

export default FAB;
