import React from 'react';
import NewHeader from '@/components/Header/NewHeader';
import FAB from '@/components/main/FAB';
import EpigramFeed from './EpigramFeed';
import AddEpigramFAB from './AddEpigramFAB';

function FeedLayout() {
  return (
    <>
      <NewHeader />
      <main className='w-full h-auto flex-col justify-start items-center gap-[72px] inline-flex bg-blue-200'>
        <div className='w-[312px] md:w-[600px] lg:w-[1200px] h-auto flex-col justify-center items-center gap-14 inline-flex'>
          <div className='self-stretch'>
            <EpigramFeed />
          </div>
        </div>
      </main>
      <AddEpigramFAB />
      <FAB />
    </>
  );
}

export default FeedLayout;
