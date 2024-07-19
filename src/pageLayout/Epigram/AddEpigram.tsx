import Header from '@/components/Header/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Label from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

function AddEpigram() {
  return (
    <>
      <Header icon='search' routerPage='/search' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <div className='border-t-2 w-full flex flex-col justify-center items-center'>
        <form className='flex flex-col justify-center item-center gap-8 w-[312px] md:w-[384px] lg:w-[640px] py-6'>
          <div className='flex flex-col gap-2 lg:gap-4 h-44 lg:h-52'>
            <Label htmlFor='content' className='text-semibold lg:text-2xl text-black-600'>
              내용
              <span className='text-state-error'>*</span>
            </Label>
            <Textarea className='h-[132px] lg:h-[148px] lg:text-xl border-blue-300 border-2 rounded-xl resize-none p-2' name='content' id='content' placeholder='500자 이내로 입력해주세요.' />
          </div>
          <div className='flex flex-col gap-2 lg:gap-4'>
            <Label className='text-semibold lg:text-2xl text-black-600'>
              저자
              <span className='text-state-error'>*</span>
            </Label>
            <RadioGroup>
              <div className='flex gap-2'>
                <div className='flex items-center space-x-2 text-xl'>
                  <RadioGroupItem value='directly' id='directly' />
                  <Label htmlFor='directly' className='font-medium lg:text-xl'>
                    직접 입력
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='unknown' id='unknown' />
                  <Label htmlFor='unknown' className='font-medium lg:text-xl'>
                    알 수 없음
                  </Label>
                </div>
                <div className='flex items-center space-x-2 text-xl'>
                  <RadioGroupItem value='me' id='me' />
                  <Label htmlFor='me' className='font-medium lg:text-xl'>
                    본인
                  </Label>
                </div>
              </div>
            </RadioGroup>
            <Input className='w-full h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2' id='authorName' name='authorName' type='text' placeholder='저자 이름 입력' />
          </div>
          <fieldset className='flex flex-col gap-2 lg:gap-4'>
            <legend className='text-semibold lg:text-2xl text-black-600'>출처</legend>
            <div className='flex flex-col gap-2 lg:gap-4'>
              <Input className='h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2' id='sourceTitle' name='sourceTitle' type='text' placeholder='출처 제목 입력' aria-label='출처 제목' />
              <Input
                className='h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2'
                id='sourceUrl'
                name='sourceUrl'
                type='url'
                placeholder='URL (ex.http://www.website.com)'
                aria-label='출처 URL'
              />
            </div>
          </fieldset>
          <div className='flex flex-col gap-2 lg:gap-4'>
            <Label htmlFor='tags' className='text-semibold lg:text-2xl text-black-600'>
              태그
            </Label>
            <Input className='h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2 ' id='tags' name='tags' type='text' placeholder='입력하여 태그 검색(최대10자)' />
          </div>
          <Button className='h-11 lg:h-16 rounded-xl text-semibold lg:text-2xl bg-blue-300 text-white' type='button'>
            작성 완료
          </Button>
        </form>
      </div>
    </>
  );
}

export default AddEpigram;
