import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import Label from '@/components/ui/label';
import Switch from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { CommentFormSchema, CommentFormValues } from '@/schema/comment';
import usePostCommentMutation from '@/hooks/usePostCommentHook';
import usePatchCommentMutation from '@/hooks/usePatchCommentHook';

interface CommentTextareaProps {
  epigramId: number;
  editingComment: { id: number; content: string; isPrivate: boolean } | null;
  onEditComplete: () => void;
}

function CommentTextarea({ epigramId, editingComment, onEditComplete }: CommentTextareaProps) {
  const postCommentMutation = usePostCommentMutation();
  const patchCommentMutation = usePatchCommentMutation();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      content: '',
      isPrivate: false,
    },
  });

  // NOTE: 수정중인지 새댓글작성중인지의 상태가 변활때 폼 초기화
  useEffect(() => {
    if (editingComment !== null) {
      form.reset({
        content: editingComment.content,
        isPrivate: editingComment.isPrivate,
      });
    } else {
      form.reset({
        content: '',
        isPrivate: false,
      });
    }
  }, [editingComment, form]);

  const onSubmit = (values: CommentFormValues) => {
    if (editingComment) {
      // NOTE: 댓글 수정 시
      patchCommentMutation.mutate(
        { commentId: editingComment.id, ...values },
        {
          onSuccess: () => {
            form.reset({ content: '', isPrivate: false });
            onEditComplete();
          },
        },
      );
    } else {
      // NOTE: 새 댓글 작성 시
      const commentData = {
        epigramId,
        ...values,
      };
      postCommentMutation.mutate(commentData, {
        onSuccess: () => {
          form.reset({ content: '', isPrivate: false });
        },
      });
    }
  };

  // NOTE: 수정 취소
  const handleCancel = () => {
    form.reset();
    onEditComplete();
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
                      editingComment ? 'border-black' : 'border-line-200'
                    }`}
                    placeholder='100자 이내로 입력해 주세요.'
                    {...field}
                  />
                  {editingComment && (
                    <button type='button' onClick={handleCancel} className='absolute top-2 right-2'>
                      <Image src='/Icon/cancelIcon.svg' alt='취소' width={20} height={20} />
                    </button>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex justify-between items-center mt-2'>
          <div className='flex items-center space-x-2'>
            <FormField
              control={form.control}
              name='isPrivate'
              render={({ field }) => (
                <FormItem className='flex items-center space-x-2'>
                  <FormControl className='m-0'>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <Label htmlFor='isPrivate' className='text-sm m-0'>
                    {field.value ? '비공개' : '공개'}
                  </Label>
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' disabled={!form.formState.isValid || postCommentMutation.isPending || patchCommentMutation.isPending} className='bg-black-500 text-white text-xs px-4 rounded-lg'>
            {editingComment ? '수정' : '저장'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CommentTextarea;
