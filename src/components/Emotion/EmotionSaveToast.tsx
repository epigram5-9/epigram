/**
 * 오늘의 감정을 선택하면 표시되는 toast입니다.
 * 감정을 확인하기 위해 마이페이지로 연결됩니다.
 */

import React, { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/router';

interface EmotionSaveToastProps {
  iconType: string;
}

function EmotionSaveToast({ iconType }: EmotionSaveToastProps) {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    toast({
      title: '오늘의 감정이 저장되었습니다.',
      description: `오늘의 감정: ${iconType}`,
      action: (
        <ToastAction altText='확인하기' onClick={() => router.push('/mypage')}>
          확인하기
        </ToastAction>
      ),
    });
  }, [iconType, toast, router]);

  return null;
}

export default EmotionSaveToast;
