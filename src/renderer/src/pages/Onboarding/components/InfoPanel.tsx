import { Button } from '@ui/index';

const InfoPanel = () => {
  return (
    <div className="bg-grey-0 flex h-full w-[386px] flex-col justify-between p-10 xl:w-[clamp(386px,calc(386px+(100vw-1280px)*0.5),462px)]">
      <div className="flex flex-col">
        {/* 현재 단계 프로그레스바 */}
        <div className="mb-[91px]">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className="bg-sementic-brand-primary h-[6px] flex-[1_0_0] rounded-full"
              />
            ))}
          </div>
        </div>

        {/*설명 부분 */}
        <div className="flex flex-col">
          {/* Keypoint */}
          <p className="text-body-md-semibold text-sementic-brand-primary flex justify-between">
            <span>Keypoint 1</span>
            <span>img</span>
          </p>
          {/* 서비스 설명 */}
          <p className="mt-4 flex flex-col gap-3">
            <span className="text-headline-3xl-bold text-grey-700">
              바른 자세 분석
            </span>
            <span className="text-body-md-meidum text-grey-400">
              이제부터 Username님이 일하는 동안 웹캠을 통해 실시간으로 자세를
              분석해 드릴게요.
            </span>
          </p>
        </div>
      </div>

      {/* 버튼 부분 */}
      <Button text="다음" className="" />
    </div>
  );
};

export default InfoPanel;
