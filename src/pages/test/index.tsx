import React from 'react';
import Header from '@/components/Header/Header';

function test() {
  const testOnclick = () => {
    alert('테스트');
  };

  return <Header icon='back' routerPage='/search' isLogo={false} insteadOfLogo='프로필 수정' isProfileIcon={false} isButton={true} textInButton='완료' onClick={testOnclick} />;
}

export default test;
