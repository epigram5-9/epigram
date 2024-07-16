import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

/**
 * @param date 날짜 문자열 또는 Date 객체
 * @return 시간을 나타내는 문자열 (예: "3일 전", "2시간 전")
 */
function getCustomRelativeTime(date: string | Date): string {
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
  // 1일(date-fns에선 23시59분30초) 이상 차이나는 경우 date-fns의 formatDistanceToNow 사용
  return formatDistanceToNow(dateToUse, { addSuffix: true, locale: ko });
}

export default getCustomRelativeTime;
