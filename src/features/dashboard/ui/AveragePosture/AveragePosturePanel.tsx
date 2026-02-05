import charactersImage from '@assets/main/characters.png';
import { useAverageScoreQuery } from '@entities/dashboard';
import { LEVEL_INFO, getLevel } from './levelConfig';

const AveragePosturePanel = () => {
  const { data, isLoading } = useAverageScoreQuery();
  const score = data?.data.score ?? 0;
  const level = getLevel(score);
  const levelInfo = LEVEL_INFO[level - 1];

  const isTurtle = level <= 2;

  return (
    <div
      className={`relative h-full w-full rounded-3xl p-4 ${isTurtle
        ? 'bg-[image:var(--color-turtle-gradient)]'
        : 'bg-[image:var(--color-average-score)]'
        }`}
    >
      <div className="items center flex flex-col h-full justify-between">
        <div className='flex justify-between'>
          <p className="text-body-xl-semibold flex min-w-[120px] flex-col text-yellow-50">
            <span>첫 사용 후</span>
            <span>나만의 자세 캐릭터를</span>
            <span>진단 받아보세요</span>
          </p>
          <span className="text-caption-xs-meidum h-[26px] rounded-full bg-yellow-50 px-2 py-1 whitespace-nowrap text-yellow-500">
            거부기린
          </span></div>

        <img
          src={charactersImage}
          alt={levelInfo.name}
          className="mt-auto max-h-[208px] w-full object-contain pb-6"
        />

      </div>


    </div>
  );
};

export default AveragePosturePanel;
