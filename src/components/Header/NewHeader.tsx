import Image from 'next/image';
import LOGO_ICON from '../../../public/epigram-icon.png';
import PROFILE_ICON from '../../../public/icon/profile-icon.svg';

export default function NewHeader() {
  return (
    <div className='w-[1920px] h-20 px-[120px] py-[26px] bg-white border-b border-[#f2f2f2] flex justify-between items-center'>
      <div className='h-9 flex items-center gap-6'>
        <div className='flex items-center gap-9'>
          <div className='flex items-center gap-1'>
            <div className='w-9 h-9 relative'>
              <Image className='w-5 h-5 lg:w-9 lg:h-9' src={LOGO_ICON} alt='logo' />
            </div>
            <div className="text-[#373737] text-xl font-black font-['Montserrat'] leading-relaxed">Epigram</div>
          </div>
          <div className='h-[26px] flex items-center gap-6'>
            <div className="text-center text-[#373737] text-base font-semibold font-['Pretendard'] leading-relaxed">피드</div>
            <div className="text-center text-[#373737] text-base font-semibold font-['Pretendard'] leading-relaxed">검색</div>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-1.5'>
        <div className='w-6 h-6 relative'>
          <Image src={PROFILE_ICON} alt='프로필 이미지' />
        </div>
        <div className="text-[#aaaaaa] text-sm font-medium font-['Pretendard'] leading-normal">김코드</div>
      </div>
    </div>
  );
}
