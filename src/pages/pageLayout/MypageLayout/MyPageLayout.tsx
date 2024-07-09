export default function MyPageLayout() {
  return (
    <div className='bg-background-100 w-full relative h-dvh'>
      <div className='bg-background-100 w-full h-[200px]' />
      <div className='w-full h-[1900px] flex flex-col items-center bg-blue-100 rounded-3xl relative shadow-3xl'>
        {/* 프로필 영역 */}
        <div className='w-[130px] h-[240px] flex flex-col justify-center items-center absolute top-[-50px]'>
          <div className='w-[120px] h-[120px] rounded-full bg-state-error' />
          {/* <img
            className='w-[120px] h-[120px] rounded-[50%]'
            alt='프로필 사진'
            src='https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjVfMjg0/MDAxNjQzMTAyOTg0Nzgz.sLrqOJ2S3r6pLboUm5yJTjB_JECC0zO9Tt3y_h86aJcg.w5VER_KDRAW3yRq8-nypsm2aGmKurM5YieSFcr1Vg0Qg.JPEG.minziminzi128/IMG_7374.JPG?type=w800'
          /> */}
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
        <div className='w-[640px] h-[344px] mt-[160px] border border-black'>
          <p>차트</p>
        </div>
      </div>
      <div className='bg-background-100 flex flex-col items-center w-full py-[100px]'>
        <div className='w-[640px] h-[600px] border border-black' />
      </div>
    </div>
  );
}
