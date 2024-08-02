import React from 'react';
import Header from '@/components/Header/Header';
import EpigramFeed from './EpigramFeed';

function FeedLayout() {
  return (
    <>
      <Header icon='search' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <main className='w-full h-auto flex-col justify-start items-center gap-[72px] inline-flex bg-blue-200'>
        <div className='w-[312px] md:w-[600px] lg:w-[1200px] h-auto flex-col justify-center items-center gap-14 inline-flex'>
          <div className='self-stretch'>
            <EpigramFeed />
          </div>
        </div>
      </main>
    </>
  );
}

export default FeedLayout;
