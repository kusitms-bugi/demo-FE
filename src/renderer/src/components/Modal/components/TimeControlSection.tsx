import { ToggleSwitch } from '@ui/ToggleSwitch/ToggleSwitch';
import { useTimeEditor } from '../hooks/useTimeEditor';

interface TimeControlSectionProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
  isDisabled?: boolean;
  timeEditor: ReturnType<typeof useTimeEditor>;
}

const MinusIcon = () => (
  <svg
    width="14"
    height="2"
    viewBox="0 0 14 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1H13" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 1V13M1 7H13"
      stroke="#1A1A1A"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const TimeControlSection = ({
  title,
  description,
  isEnabled,
  onToggle,
  isDisabled = false,
  timeEditor,
}: TimeControlSectionProps) => {
  return (
    <div
      className={`bg-grey-25 flex flex-col gap-1 rounded-[12px] p-3 ${isDisabled ? 'pointer-events-none opacity-40' : ''}`}
    >
      {/* 헤더 */}
      <div className="flex justify-between">
        <span className="text-body-lg-semibold text-grey-900">{title}</span>
        <ToggleSwitch checked={isEnabled} onChange={onToggle} />
      </div>

      {/* 설명 */}
      <span className="text-caption-xs-meidum text-grey-400 mb-4">
        {description}
      </span>

      {/* 시간 조절 UI */}
      <div
        className={`flex items-center justify-center gap-4 ${!isEnabled ? 'pointer-events-none opacity-40' : ''}`}
      >
        {/* 감소 버튼 */}
        <button
          onClick={timeEditor.handlers.decreaseTime}
          disabled={!isEnabled || timeEditor.time <= 1}
          className="bg-grey-0 flex h-8 w-8 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          <MinusIcon />
        </button>

        {/* 시간 표시/입력 */}
        {timeEditor.isEditing ? (
          <input
            ref={timeEditor.inputRef}
            type="text"
            value={timeEditor.tempTime}
            onChange={timeEditor.handlers.handleTimeChange}
            onKeyDown={timeEditor.handlers.handleTimeKeyDown}
            onBlur={timeEditor.handlers.handleTimeSubmit}
            className="text-heading-2xl-bold text-grey-900 border-grey-900 w-16 border-b-2 bg-transparent text-center outline-none"
          />
        ) : (
          <div
            onClick={timeEditor.handlers.handleTimeClick}
            className="text-heading-2xl-bold text-grey-900 min-w-[64px] cursor-pointer text-center"
          >
            {timeEditor.time}분
          </div>
        )}

        {/* 증가 버튼 */}
        <button
          onClick={timeEditor.handlers.increaseTime}
          disabled={!isEnabled}
          className="bg-grey-0 flex h-8 w-8 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};
