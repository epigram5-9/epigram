import { EmotionLog, EmotionTypeEN } from '@/types/emotion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Image from 'next/image';
import { iconPaths } from '../../user/utill/constants';

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
  const TOTAL_COUNT = monthlyEmotionLogs.length;
  const EMOTIONS: EmotionTypeEN[] = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'];

  // 가장 많이 나타나는 감정 찾기
  const maxEmotion = EMOTIONS.reduce((max, emotion) => (emotionCounts[emotion] > emotionCounts[max] ? emotion : max), EMOTIONS[0]);

  // 원형 차트 데이터 생성 및 정렬 (가장 많은 감정부터)
  const chartData = EMOTIONS.map((emotion) => ({
    name: emotion,
    value: emotionCounts[emotion] || 0,
  })).sort((a, b) => b.value - a.value);

  // 감정 색상 설정
  const COLORS = {
    MOVED: '#48BB98',
    HAPPY: '#FBC85B',
    WORRIED: '#C7D1E0',
    SAD: '#E3E9F1',
    ANGRY: '#EFF3F8',
  };

  return (
    <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] mt-[160px] space-y-0 md:mb-10 mb-5 gap-[48px]'>
      <h2 className='text-neutral-700 text-2xl font-semibold leading-loose'>감정 차트</h2>
      <div className='flex justify-between items-center px-[112px]'>
        <div className='w-[200px] h-[200px] relative'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={chartData}
                dataKey='value'
                cx='50%'
                cy='50%'
                outerRadius={90}
                innerRadius={70} // 도넛 차트를 위해 innerRadius 설정
                startAngle={90} // 12시 방향에서 시작
                endAngle={-270} // 시계 방향으로 회전
                fill='#8884d8'
              >
                {chartData.map((emotion, index) => (
                  // TODO: index 값 Lint error. 임시로 주석 사용. 추후 수정 예정
                  // eslint-disable-next-line react/no-array-index-key
                  <Cell key={`cell-${index}`} fill={COLORS[emotion.name]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* 중앙에 가장 많이 나타나는 감정 출력 */}
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3'>
            <Image src={iconPaths[maxEmotion].path} alt='감정' width={40} height={40} />
            <p>{iconPaths[maxEmotion].name}</p>
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-4'>
            {chartData.map((emotion) => {
              const percentage = TOTAL_COUNT > 0 ? Math.floor((emotion.value / TOTAL_COUNT) * 100) : 0;

              return (
                <div key={emotion.name} className='flex items-center gap-3'>
                  <div style={{ backgroundColor: COLORS[emotion.name], width: '16px', height: '16px' }}></div>
                  <Image src={iconPaths[emotion.name].path} alt='감정' width={24} height={24} />
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
