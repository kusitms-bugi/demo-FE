import { ToggleSwitch } from '@ui/ToggleSwitch/ToggleSwitch';
import { useState } from 'react';

interface NotificationModalProps {
  onClose: () => void;
}

const NotificationModal = ({ onClose }: NotificationModalProps) => {
  const [isAllow, setIsAllow] = useState(false);

  return (
    <div>
      <div className="bg-grey-0 p-4">
        <div className="bg-grey-25 flex justify-between p-3">
          <span className="text-body-lg-semibold text-grey-900">알림 허용</span>
          <ToggleSwitch
            checked={isAllow}
            onChange={() => setIsAllow(!isAllow)}
          />
        </div>
        <div className="bg-grey-25 flex justify-between p-3">
          <p>
            <span className="text-body-lg-semibold text-grey-900">
              맞춤 스트레칭 주기
            </span>
          </p>
          <span className="text-caption-xs-meidum text-grey-400 mb-4">
            나만의 스트레칭 타이밍이에요. 뽀모도로 타이머처
            <br />럼 휴식 구간으로 설정해도 좋아요
          </span>
          <div></div>
        </div>
        <div className="bg-grey-25 flex justify-between p-3">
          <p>
            <span className="text-body-lg-semibold text-grey-900">
              맞춤 스트레칭 주기
            </span>
          </p>
          <span className="text-caption-xs-meidum text-grey-400 mb-4">
            거북목 자세가지속되면 자세 교정 알림이 울려요
          </span>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
