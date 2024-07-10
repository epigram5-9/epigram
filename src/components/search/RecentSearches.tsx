function RecentSearches() {
  return (
    <div className='flex flex-col items-start gap-10 mt-10 mb-10'>
      <div className='flex flex-row justify-between items-center'>
        <span className='text-black-700 font-pretendard pretendard-2xl-medium'>최근 검색어</span>
        <span className='text-state-error font-pretendard pretendard-lg-semibold'>모두 지우기</span>
      </div>
      <div className='flex flex-col items-start gap-4 text-black-300 font-pretendard pretendard-2xl-regular'>
        <div className='flex-row items-start gap-4'>
          <span className='flex flex-col justify-center items-center p-3 px-[14px] gap-2 rounded-[22px] bg-background-100'>꿈</span>
          <span className='flex flex-col justify-center items-center p-3 px-[14px] gap-2 rounded-[22px] bg-background-100'>#나아가야할때</span>
          <span className='flex flex-col justify-center items-center p-3 px-[14px] gap-2 rounded-[22px] bg-background-100'>꿈을이루고싶을때</span>
        </div>
        <div className='flex-row items-start gap-4'>
          <span className='flex flex-col justify-center items-center p-3 px-[14px] gap-2 rounded-[22px] bg-background-100'>슬픔</span>
          <span className='flex flex-col justify-center items-center p-3 px-[14px] gap-2 rounded-[22px] bg-background-100'>응원받고싶을때</span>
        </div>
      </div>
    </div>
  );
}

export default RecentSearches;
