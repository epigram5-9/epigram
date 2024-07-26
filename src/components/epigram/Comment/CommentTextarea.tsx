import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import Label from '@/components/ui/label';
import Switch from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { CommentFormSchema, CommentFormValues } from '@/schema/comment';
import { usePostCommentMutation } from '@/hooks/usePostCommentHook';

interface CommentTextareaProps {
  epigramId: number;
}

function CommentTextarea({ epigramId }: CommentTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const postCommentMutation = usePostCommentMutation();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentFormSchema),
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
    /* eslint-disable-next-line no-console */
    postCommentMutation.mutate(commentData, {
      onSuccess: () => {
        form.reset();
        setIsFocused(false);
      },
    });
  };

  const handleCancel = () => {
    setIsFocused(false);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full relative'>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative'>
                  <Textarea
                    className={`bg-slate-100 w-full text-base lg:text-xl text-black p-4 border-solid border-2 rounded-lg resize-none focus-visible:ring-0 ${
                      isFocused ? 'border-black' : 'border-line-200'
                    }`}
                    placeholder='100자 이내로 입력해 주세요.'
                    onFocus={() => setIsFocused(true)}
                    {...field}
                  />
                  {isFocused && (
                    <button type='button' onClick={handleCancel} className='absolute top-2 right-2'>
                      <Image src='/Icon/cancelIcon.svg' alt='취소' width={20} height={20} />
                    </button>
                  )}
                </div>
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
            <Button type='submit' disabled={!form.formState.isValid || postCommentMutation.isPending} className='bg-black-500 text-white text-xs px-4 rounded-lg'>
              {postCommentMutation.isPending ? '저장 중...' : '저장'}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default CommentTextarea;
