import * as z from 'zod';

/** **************** 감정 달력 ***************** */
export const GetMonthlyEmotionLogsRequest = z.object({
  userId: z.number(),
  year: z.number(),
  month: z.number(),
});

// 감정 로그 항목의 스키마 정의
const EmotionSchema = z.object({
  id: z.number(),
  userId: z.number(),
  emotion: z.enum(['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY']),
  createdAt: z.coerce.date(),
});

// 감정 로그 배열 정의
export const GetMonthlyEmotionLogsResponse = z.array(EmotionSchema);

export type GetMonthlyEmotionLogsRequestType = z.infer<typeof GetMonthlyEmotionLogsRequest>;
export type GetMonthlyEmotionLogsResponseType = z.infer<typeof GetMonthlyEmotionLogsResponse>;
