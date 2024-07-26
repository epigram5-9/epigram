import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import Label from '@/components/ui/label';
import Switch from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  content: z.string().min(1, '댓글을 입력해주세요.').max(100, '100자 이내로 입력해주세요.'),
  isPrivate: z.boolean().default(true),
});

type CommentFormValues = z.infer<typeof formSchema>;

interface CommentTextareaProps {
  epigramId: number;
}

function CommentTextarea({ epigramId }: CommentTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      isPrivate: false,
    },
  });

  const onSubmit = (values: CommentFormValues) => {
    const commentData = {
      epigramId,
      ...values,
    };
    // NOTE: 로직 구현전이라서 임시 console.log 사용
    /* eslint-disable-next-line no-console */
    console.log('댓글 제출:', commentData);
    form.reset();
    setIsFocused(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className={`bg-slate-100 w-full text-base lg:text-xl text-black p-4 border-solid border-2 rounded-lg resize-none focus-visible:ring-0 ${
                    isFocused ? 'border-black' : 'border-line-200'
                  }`}
                  placeholder='100자 이내로 입력해 주세요.'
                  onFocus={() => setIsFocused(true)}
                  {...field}
                  onBlur={() => {
                    field.onBlur();
                    setIsFocused(false); // 추가적인 onBlur 동작
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {isFocused && (
          <div className='flex justify-between items-center mt-2'>
            <div className='flex items-center space-x-2'>
              <FormField
                control={form.control}
                name='isPrivate'
                render={({ field }) => (
                  <FormItem className='flex items-center space-x-2'>
                    <Label htmlFor='isPrivate' className='text-sm'>
                      공개
                    </Label>
                    <FormControl className='m-0'>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' disabled={!form.formState.isValid} className='bg-black-500 text-white text-xs px-4 rounded-lg'>
              저장
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default CommentTextarea;
