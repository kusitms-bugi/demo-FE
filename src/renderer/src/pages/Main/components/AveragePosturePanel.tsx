const AveragePosturePanel = () => {
  return (
    <div className="relative h-full w-full rounded-3xl bg-[image:var(--color-average-score)] p-4">
      <div className="items center flex justify-between">
        <span className="text-caption-sm-medium text-yellow-100">
          평균 자세 점수
        </span>
        <span className="text-caption-xs-meidum h-[26px] w-[61px] rounded-full bg-yellow-50 px-2 py-1 text-yellow-500">
          쑥쑥 기린
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-title-4xl-bold text-grey-0">47점</span>
        <span className="text-caption-xs-meidum text-yellow-50">
          목 평균 기울기 약 23.1도
          <br />
          예상 부하 하중 약 6kg
        </span>
      </div>
      <div className="absolute inset-x-4 bottom-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className="h-[6px] flex-[1_0_0] rounded-full bg-yellow-50"
          />
        ))}
      </div>
    </div>
  );
};

export default AveragePosturePanel;
