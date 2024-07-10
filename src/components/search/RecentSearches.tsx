function RecentSearches() {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <span className='text-black-700 font-pretendard text-2xl font-medium'>최근 검색어</span>
        <span className='text-state-error font-pretendard text-custom-lg font-semibold'>모두 지우기</span>
      </div>
      <span className='flex flex-col justify-center items-center p-[12px] px-[14px] gap-[8px] rounded-[22px] bg-background-100'>#나아가야할때</span>
    </div>
  );
}

export default RecentSearches;
