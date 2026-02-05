import DownIcon from '@assets/common/icons/arrow-narrow-down.svg?react';
import UpIcon from '@assets/common/icons/arrow-narrow-up.svg?react';
import { IntensitySlider } from '@shared/ui/intensity-slider';
import { PageMoveButton } from '@shared/ui/page-move-button';
import { PannelHeader } from '@shared/ui/panel-header';
import { ToggleSwitch } from '@shared/ui/toggle-switch';

import Calendar from './components/Calendar';

type AttendancePanelPresenterProps = {
  viewYear: number;
  viewMonth: number; // 0~11
  isAtCurrentMonth: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;

  attendances?: Record<string, number>;
  title: string;
  content1?: string;
  content2?: string;
  subContentMessage: string;
};

const AttendancePanelPresenter = ({
  viewYear,
  viewMonth,
  isAtCurrentMonth,
  onPrevMonth,
  onNextMonth,
  attendances,
  title,
  content1,
  content2,
  subContentMessage,
}: AttendancePanelPresenterProps) => {
  return (
    <div className="grid h-full w-full grid-cols-4 grid-rows-[57px_1fr_1fr_1fr] gap-2 p-4">
      <div className="flex flex-col">
        <PannelHeader>출석 현황</PannelHeader>
        <div className="text-headline-3xl-semibold text-grey-700">
          {viewMonth + 1}월
        </div>
      </div>

      <div className="flex items-end justify-end p-[9px]">
        <div className="flex gap-2">
          <PageMoveButton direction="prev" onClick={onPrevMonth} />
          <PageMoveButton
            direction="next"
            onClick={onNextMonth}
            disabled={isAtCurrentMonth}
          />
        </div>
      </div>

      <div />

      <div className="flex flex-col items-end justify-end gap-3">
        <ToggleSwitch
          uncheckedLabel="월간"
          checkedLabel="연간"
          checked={false}
          onChange={() => { }}
        />
        <IntensitySlider leftLabel="Less" rightLabel="More" />
      </div>

      <div className="col-span-2 row-span-3">
        <Calendar year={viewYear} month={viewMonth} attendances={attendances} />
      </div>

      <div className="bg-grey-25 col-span-2 row-span-3 rounded-xl p-3">
        <div className="mb-2 flex h-[76px] flex-col gap-3">
          <div className="text-grey-700 text-body-md-semibold">유저님 환영해요!</div>
          <div className="text-caption-xs-regular text-grey-600 flex flex-col gap-1">

            <div className="flex items-center gap-1">
              <UpIcon />
              바른 자세를 유지하는 것만으로도 업무 효율이 n% 올라요!
            </div>


            <div className="flex items-center gap-1">
              <DownIcon />
              거북목 자세는 목과 어깨뿐만 아니라 척추에도 무리를 줘요.
            </div>

          </div>
        </div>
        <div className="bg-grey-50 h-px w-full" />
        <div className="text-grey-500 text-caption-sm-medium flex h-[calc(100%-84px)] w-full items-center">
          7일 이상 사용하여 거부기린이 분석한
          <br />개인화 데이터를 열람해보세요!
        </div>
      </div>
    </div>
  );
};

export default AttendancePanelPresenter;
