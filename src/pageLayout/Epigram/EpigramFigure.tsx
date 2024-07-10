import Image from 'next/image';

function EpigramFigure() {
  return (
    <div className='bg-[length:100%_2.5em] bg-[linear-gradient(#eee_.1em,transparent_.1em)] w-full flex justify-center py-6'>
      <figure className='w-[640px] flex flex-col gap-8'>
        <div className='flex gap-2'>
          <p className='text-gray-400  text-xl'>#꿈을 이루고싶을때</p>
          <p className='text-gray-400  text-xl'>#나아가야할때</p>
        </div>
        <blockquote className=''>
          <p className='text-3xl'>오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.</p>
        </blockquote>
        <figcaption className='text-right text-2xl text-gray-400'>-앙드레 말로-</figcaption>
        <div className='flex justify-center gap-4'>
          <button type='button'>
            <div className='w-24 h-12 flex items-center justify-center  text-white rounded-full bg-black'>
              <Image src='/likeIcon.svg' alt='좋아요 아이콘' width={36} height={36} />
              <p>123</p>
            </div>
          </button>
          <button type='button' className=''>
            <div className='w-40 h-12 flex items-center justify-center rounded-full bg-gray-100'>
              <p>왕도로 가는길</p>
              <Image src='/placeLink.svg' alt='지도링크' width={36} height={36} />
            </div>
          </button>
        </div>
      </figure>
    </div>
  );
}

export default EpigramFigure;
