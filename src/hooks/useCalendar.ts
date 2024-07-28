import { getDaysInMonth } from 'date-fns';
import { CALENDAR_LENGTH, DAY_OF_WEEK } from '../user/utill/constants';

interface CalendarData {
  weekCalendarList: number[][]; // 주별 날짜 리스트
}

// 이전 달의 날짜를 계산하는 함수
const getPreviousDays = (firstDayOfCurrentMonth: Date, totalPrevMonthDays: number): number[] =>
  // 현재 월의 첫 번째 날의 요일을 기준으로 이전 달의 날짜를 배열로 반환
  Array.from({ length: firstDayOfCurrentMonth.getDay() }, (_, index) => totalPrevMonthDays - firstDayOfCurrentMonth.getDay() + index + 1);
// 현재 월의 날짜를 배열로 반환하는 함수
const getCurrentDays = (totalMonthDays: number): number[] => Array.from({ length: totalMonthDays }, (_, i) => i + 1); // 1부터 totalMonthDays까지의 배열 생성
// 다음 달의 날짜를 계산하는 함수
const getNextDays = (currentDayList: number[], prevDayList: number[]): number[] => {
  // 다음 달의 날짜 수를 계산하여 배열로 반환
  const nextDayCount = CALENDAR_LENGTH - currentDayList.length - prevDayList.length;
  return Array.from({ length: Math.max(nextDayCount, 0) }, (_, index) => index + 1);
};

const useCalendar = (currentDate: Date): CalendarData => {
  // 현재 월의 총 날짜 수를 가져옴
  const totalMonthDays = getDaysInMonth(currentDate);

  // 이전 달의 마지막 날짜를 계산
  const prevMonthLastDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  // 이전 달의 총 날짜 수를 가져옴
  const totalPrevMonthDays = getDaysInMonth(prevMonthLastDate);

  // 현재 월의 첫 번째 날짜를 계산
  const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  // 이전 달의 날짜 리스트
  const prevDayList = getPreviousDays(firstDayOfCurrentMonth, totalPrevMonthDays);
  // 현재 월의 날짜 리스트
  const currentDayList = getCurrentDays(totalMonthDays);
  // 다음 달의 날짜 리스트
  const nextDayList = getNextDays(currentDayList, prevDayList);

  // 전체 날짜 리스트 (이전 / 현재 / 다음 달 날짜 포함)
  const currentCalendarList = [...prevDayList, ...currentDayList, ...nextDayList];

  // 주별로 날짜 리스트를 분할
  const weekCalendarList: number[][] = [];
  currentCalendarList.forEach((currDate, index) => {
    const chunkIndex = Math.floor(index / DAY_OF_WEEK);
    if (!weekCalendarList[chunkIndex]) {
      weekCalendarList[chunkIndex] = []; // 주 배열이 없으면 초기화
    }
    weekCalendarList[chunkIndex].push(currDate); // 누적값 반환
  });

  // NOTE: 한 달이 5주 일 수도, 6주 일 수도 있을 때 5주인 경우 해당 달에 필요없는 다음 달의 날짜가 출력되기 때문에 (CALENDAR_LENGTH를 최대치인 42로 잡아서) 마지막 주의 첫 번째 숫자가 10이하의 날짜로 시작한다면 해당 배열을 삭제하도록 추가.
  // TODO: 추후 다른 방법이 있다면 변경 할 예정
  if (weekCalendarList.length > 0) {
    const lastWeek = weekCalendarList[weekCalendarList.length - 1];
    if (lastWeek[0] <= 10) {
      weekCalendarList.pop();
    }
  }

  // 캘린더 정보를 반환
  return {
    weekCalendarList, // 주별 날짜 리스트
  };
};

export default useCalendar;
