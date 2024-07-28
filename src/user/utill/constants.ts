// 파일 업로드 관련
export const MAX_FILE_SIZE = 1024 * 1024 * 5; // 파일 업로드 최대 용량 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']; // 허용 가능 확장자
export const sampleImage = '/ProfileTestImage.jpg'; // 초기프로필 이미지

// 캘린더 관련 상수
export const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토']; // 요일
export const DATE_MONTH_FIXER = 1; // 날짜 조정 상수 (현재 사용되지 않음, 필요에 따라 활용 가능)
export const CALENDAR_LENGTH = 42; // 6주에 맞추어 캘린더의 총 길이를 42로 설정
export const DAY_OF_WEEK = 7; // 한 주의 날 수 (일~토)
export const DEFAULT_TRASH_VALUE = -1; // 기본값 설정 (필요에 따라 사용 가능)

// 아이콘 파일 경로 매핑
export const iconPaths = {
  MOVED: { path: '/icon/Color/HeartFaceColorIcon.svg', name: '기쁨', color: 'bg-illust-green' },
  HAPPY: { path: '/icon/Color/SmileFaceColorIcon.svg', name: '감동', color: 'bg-illust-yellow' },
  WORRIED: { path: '/icon/Color/ThinkFaceColorIcon.svg', name: '고민', color: 'bg-sub-gray_1' },
  SAD: { path: '/icon/Color/SadFaceColorIcon.svg', name: '슬픔', color: 'bg-sub-gray_2' },
  ANGRY: { path: '/icon/Color/AngryFaceColorIcon.svg', name: '분노', color: 'bg-sub-gray_3' },
};
