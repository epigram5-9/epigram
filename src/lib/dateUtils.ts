import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

/**
 * @param date - 날짜 문자열 또는 Date 객체
 * @returns 시간을 나타내는 문자열 (예: "3일 전", "2시간 전")
 */
export function getRelativeTimeString(date: string | Date): string {
  const dateToUse = typeof date === 'string' ? parseISO(date) : date;

  // NOTE: formatDistanceToNow는 현재시각을 기준으로 단어를 사용해 시간을 나타내주는 함수
  return formatDistanceToNow(dateToUse, {
    addSuffix: true,
    locale: ko,
  });
}

export function getCustomRelativeTime(date: string | Date): string {
  const dateToUse = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateToUse.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '방금 전';
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  }
  // 1일 이상 차이나는 경우 date-fns의 formatDistanceToNow 사용
  return formatDistanceToNow(dateToUse, { addSuffix: true, locale: ko });
}
