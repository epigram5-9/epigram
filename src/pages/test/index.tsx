import React from 'react';
import Header from '@/components/Header/Header';

function test() {
  const testOnclick = () => {
    alert('테스트 코드');
  };

  return <Header icon='search' routerPage='/search' isLogo insteadOfLogo='' isProfileIcon={false} isButton textInButton='테스트' onClick={testOnclick} />;
}

export default test;
