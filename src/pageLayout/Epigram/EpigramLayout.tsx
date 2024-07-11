import Image from 'next/image';
import EpigramFigure from './EpigramFigure';
import CommentSection from './EpigramComment';

function EpigramLayout() {
  return (
    <div className='flex flex-col '>
      <nav className='flex justify-between border-b-2 px-6 py-4'>
        <Image src='/arrow-left.svg' alt='뒤로가기 버튼' width={36} height={36} />
        <Image src='/logo.svg' alt='Epigram 로고' width={172} height={48} />
        <Image src='/share.svg' alt='공유 버튼' width={36} height={36} />
      </nav>
      <EpigramFigure />
      <CommentSection />
    </div>
  );
}

export default EpigramLayout;
