import React from 'react';
import Header from '@/components/Header/Header';
import Toaster from '@/components/ui/toaster';

function test() {
  const testOnclick = () => {
    alert('테스트 코드');
  };

  return (
    <>
      <Header icon='back' routerPage='/search' isLogo insteadOfLogo='' isProfileIcon={false} isShareIcon={false} isButton={false} textInButton='테스트' disabled={false} onClick={testOnclick} />;
      <Toaster />
    </>
  );
}

export default test;
