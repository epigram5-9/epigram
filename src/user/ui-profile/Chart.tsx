import { EmotionLog, EmotionType } from '@/types/emotion';
import Image from 'next/image';
import { iconPaths } from '../utill/constants';

interface ChartProps {
  monthlyEmotionLogs: EmotionLog[];
}

export default function Chart({ monthlyEmotionLogs }: ChartProps) {
  // 감정별 빈도수 계산
  const emotionCounts = monthlyEmotionLogs.reduce(
    (count, log) => {
      const { emotion } = log;
      return {
        ...count, // 기존의 count를 복사
        [emotion]: (count[emotion] || 0) + 1, // 현재 감정의 개수 증가
      };
    },
    {} as Record<string, number>,
  );

  // 감정 종류 및 총 감정 수 계산
  const totalCount = monthlyEmotionLogs.length;
  const emotions: EmotionType[] = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'];
  const radius = 90; // 원의 반지름
  const circumference = 2 * Math.PI * radius;

  // 가장 많이 나타나는 감정 찾기
  const maxEmotion = emotions.reduce((max, emotion) => (emotionCounts[emotion] > emotionCounts[max] ? emotion : max), emotions[0]);

  // 원형 차트의 각 감정에 대한 strokeDasharray와 strokeDashoffset 계산
  let offset = 0;

  return (
    <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] mt-[160px] space-y-0 md:mb-10 mb-5 gap-[48px]'>
      <h2 className='text-neutral-700 text-2xl font-semibold leading-loose'>감정 차트</h2>
      <div className='flex justify-between items-center px-[112px]'>
        <div className='w-[200px] h-[200px] relative'>
          <svg viewBox='0 0 200 200'>
            <circle cx='100' cy='100' r={radius} fill='none' stroke='beige' strokeWidth='20' />
            {emotions.map((emotion) => {
              const count = emotionCounts[emotion] || 0;
              const percentage = totalCount > 0 ? count / totalCount : 0; // 0으로 나누기 방지
              const strokeDasharray = `${circumference * percentage} ${circumference * (1 - percentage)}`;

              // 색상 설정
              let strokeColor;
              switch (emotion) {
                case 'HAPPY':
                  strokeColor = '#FBC85B';
                  break;
                case 'SAD':
                  strokeColor = '#E3E9F1';
                  break;
                case 'WORRIED':
                  strokeColor = '#C7D1E0';
                  break;
                case 'ANGRY':
                  strokeColor = '#EFF3F8';
                  break;
                default:
                  strokeColor = '#48BB98';
              }

              const circle = <circle key={emotion} cx='100' cy='100' r={radius} fill='none' stroke={strokeColor} strokeWidth='20' strokeDasharray={strokeDasharray} strokeDashoffset={offset} />;

              offset += circumference * percentage; // 다음 원을 위한 offset 업데이트
              return circle;
            })}
          </svg>
          {/* 중앙에 가장 많이 나타나는 감정 출력 */}
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3'>
            <Image src={iconPaths[maxEmotion].path} alt='감정' width={40} height={40} />
            <p>{iconPaths[maxEmotion].name}</p>
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-4'>
            {emotions.map((emotion) => {
              const count = emotionCounts[emotion] || 0;
              const percentage = totalCount > 0 ? Math.floor((count / totalCount) * 100) : 0; // 퍼센트 계산 및 소수점 버리기

              return (
                <div key={emotion} className='flex items-center gap-3'>
                  <p className={`${iconPaths[emotion].color} w-[16px] h-[16px]`}></p>
                  <Image src={iconPaths[emotion].path} alt='감정' width={24} height={24} />
                  <p>{percentage}%</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
