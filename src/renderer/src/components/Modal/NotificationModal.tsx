import { ToggleSwitch } from '@ui/ToggleSwitch/ToggleSwitch';
import { useState } from 'react';
import { useTimeEditor } from './hooks/useTimeEditor';
import { TimeControlSection } from './components/TimeControlSection';

interface NotificationModalProps {
  onClose: () => void;
}

const NotificationModal = ({ onClose }: NotificationModalProps) => {
  /* 알림 허용 */
  const [isAllow, setIsAllow] = useState(false);

  /* 스트레칭 주기 */
  const [isStretchingEnabled, setIsStretchingEnabled] = useState(false);
  const stretching = useTimeEditor({
    initialTime: 30,
    isEnabled: isAllow && isStretchingEnabled,
  });

  /* 거북목 경고 */
  const [isTurtleNeckEnabled, setIsTurtleNeckEnabled] = useState(false);
  const turtleNeck = useTimeEditor({
    initialTime: 10,
    isEnabled: isAllow && isTurtleNeckEnabled,
  });

  return (
    <>
      <div className="fixed inset-0 z-999999 h-full w-full bg-black/40">
        <div className="bg-grey-0 fixed top-[45%] left-1/2 flex w-[339px] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-[24px] p-4">
          {/* 알림 허용 */}
          <div className="bg-grey-25 flex justify-between rounded-[12px] p-3">
            <span className="text-body-lg-semibold text-grey-900">
              알림 허용
            </span>
            <ToggleSwitch
              checked={isAllow}
              onChange={() => setIsAllow(!isAllow)}
            />
          </div>

          {/* 맞춤 스트레칭 주기 */}
          <TimeControlSection
            title="맞춤 스트레칭 주기"
            description="나만의 스트레칭 타이밍이에요. 뽀모도로 타이머처럼 휴식 구간으로 설정해도 좋아요"
            isEnabled={isStretchingEnabled}
            onToggle={() => setIsStretchingEnabled(!isStretchingEnabled)}
            isDisabled={!isAllow}
            timeEditor={stretching}
          />

          {/* 거북목 경고 */}
          <TimeControlSection
            title="거북목 경고"
            description="거북목 자세가 지속되면 자세 교정 알림이 울려요"
            isEnabled={isTurtleNeckEnabled}
            onToggle={() => setIsTurtleNeckEnabled(!isTurtleNeckEnabled)}
            isDisabled={!isAllow}
            timeEditor={turtleNeck}
          />

          {/* 저장하기 버튼 */}
          <button
            onClick={onClose}
            className="text-grey-900 text-body-lg-semibold w-full rounded-full bg-yellow-500 py-3 transition-colors hover:bg-yellow-600"
          >
            저장하기
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
