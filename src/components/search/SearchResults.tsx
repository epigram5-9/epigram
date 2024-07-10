function SearchResults() {
  return (
    <div className='flex flex-col py-4 px-6 lg:p-6 gap-2 lg:gap-[16px] border-b border-gray-100'>
      <div className='flex flex-col gap-1 md:gap-2 lg:gap-6'>
        <span className='text-black-600 font-iropkeBatang iropke-lg lg:iropke-xl'>오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.</span>
        <span className='text-blue-400 font-iropkeBatang iropke-lg lg:iropke-xl'>- 앙드레 말로 -</span>
      </div>
      <div className='flex flex-row justify-end gap-3'>
        <span className='text-blue-400 font-pretendard iropke-lg lg:iropke-xl'>#동기부여</span>
        <span className='text-blue-400 font-pretendard iropke-lg lg:iropke-xl'>#우울할때</span>
        <span className='text-blue-400 font-pretendard iropke-lg lg:iropke-xl'>#나아가야할때</span>
      </div>
    </div>
  );
}

export default SearchResults;
