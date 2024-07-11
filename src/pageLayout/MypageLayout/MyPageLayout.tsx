function MyPageLayout() {
  return (
    <div className='bg-background-100 w-full relative h-dvh'>
      <div className='bg-background-100 w-full h-[200px]'></div>
      <div className='w-full h-[1900px] flex flex-col items-center bg-blue-100 rounded-3xl relative shadow-3xl'>
        {/* 프로필 영역 */}
        <div className='w-[130px] h-[240px] flex flex-col justify-center items-center absolute top-[-50px]'>
          <div className='w-[120px] h-[120px] rounded-full bg-state-error'></div>
          <p className='mt-4 mb-6'>선글라스 고양이</p>
          <div className='w-[100px] h-12 pl-4 pr-3.5 py-1.5 bg-zinc-100 rounded-[100px] justify-start items-center gap-1.5 inline-flex'>
            <div className="text-neutral-400 text-xl font-medium font-['Pretendard'] leading-loose">로그아웃</div>
          </div>
        </div>
        {/* 오늘으 ㅣ감정 */}
        <div className='w-[640px] h-[216px] mt-[300px] border border-black'>
          <p>오늘의 감정</p>
        </div>
        {/* 캘린더 */}
        <div className='w-[640px] h-[648px] mt-[160px] border border-black'>
          <p>캘린더</p>
        </div>
        {/* 감정 차트 */}
        <div className='w-[640px] mt-[160px] flex flex-col gap-6'>
          <p className='text-black-600 font-semibold text-2xl'>감정 차트</p>
          <div className='w-[640px] h-[264px] py-6 px-28 flex justify-between'>
            <div>
              <div className='flex justify-center items-center w-[180px] h-[180px] bg-gray-200 rounded-full'></div>
            </div>
            <div className='inline-flex flex-col justify-start items-start gap-3.5'>
              <div className='w-[116px] h-8 justify-start items-center gap-4 inline-flex'>
                <div className='w-4 h-4 bg-emerald-400 rounded-sm'></div>
                <div>감정</div>
                <div>35%</div>
              </div>
              <div className='w-[116px] h-8 justify-start items-center gap-4 inline-flex'>
                <div className='w-4 h-4 bg-illust-yellow rounded-sm'></div>
                <div>감정</div>
                <div>35%</div>
              </div>
              <div className='w-[116px] h-8 justify-start items-center gap-4 inline-flex'>
                <div className='w-4 h-4 bg-slate-300 rounded-sm'></div>
                <div>감정</div>
                <div>35%</div>
              </div>
              <div className='w-[116px] h-8 justify-start items-center gap-4 inline-flex'>
                <div className='w-4 h-4 bg-slate-200 rounded-sm'></div>
                <div>감정</div>
                <div>35%</div>
              </div>
              <div className='w-[116px] h-8 justify-start items-center gap-4 inline-flex'>
                <div className='w-4 h-4 bg-slate-100 rounded-sm'></div>
                <div>감정</div>
                <div>35%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-background-100 flex flex-col items-center w-full py-[100px]'>
        <div className='w-[640px] h-[600px] flex flex-col gap-12'>
          <div className='inline-flex gap-6'>
            <p className='text-neutral-400 font-semibold text-2xl'>내 에피그램(10)</p>
            <p className='text-black-600 font-semibold text-2xl'>내 댓글(110)</p>
          </div>
          <div className='w-full'>{/* 댓글 컴포넌트 */}</div>
        </div>
      </div>
    </div>
  );
}

export default MyPageLayout;
