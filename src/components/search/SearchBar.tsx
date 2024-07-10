import Image from 'next/image';
import SEARCH_ICON from '../../../public/md.svg';

function SearchBar() {
  return (
    <form className='flex justify-between items-center h-20 mt-6 py-[26px] gap-[10px] border-b-[4px] border-blue-800'>
      <input className='flex text-left text-black-700 text-center font-pretendard pretendard-2xl-regular' placeholder='검색어를 입력해주세요.' />
      <button type='submit' className='flex justify-center items-center bg-transparent'>
        <Image className='w-9 h-9' src={SEARCH_ICON} alt='검색 아이콘' />
      </button>
    </form>
  );
}

export default SearchBar;
