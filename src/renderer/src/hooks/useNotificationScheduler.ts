import { useEffect, useRef } from 'react';
import { useNotificationStore } from '../store/useNotificationStore';

/* 알림 스케줄러 훅 , 설정된 시간에 따라 시스템 알림을 자동으로 표시 */
export const useNotificationScheduler = () => {
  const { isAllow, stretching, turtleNeck } = useNotificationStore();

  /* 타이머 저장 변수 */
  const stretchingTimerRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const turtleNeckTimerRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  /* 스트레칭 알림 표시 */
  const showStretchingNotification = async () => {
    try {
      await window.electronAPI.notification.show(
        '스트레칭 시간이에요! 🧘',
        `${stretching.interval}분이 지났어요. 잠시 스트레칭을 해보는 건 어떨까요?`,
      );
    } catch (error) {
      console.error('Failed to show stretching notification:', error);
    }
  };

  /* 거북목 알림 표시 */
  const showTurtleNeckNotification = async () => {
    try {
      await window.electronAPI.notification.show(
        '자세를 확인해주세요! 🐢',
        `${turtleNeck.interval}분 동안 거북목 자세가 감지되었어요. 자세를 바로잡아주세요.`,
      );
    } catch (error) {
      console.error('Failed to show turtle neck notification:', error);
    }
  };

  /* 스트레칭 타이머 설정 */
  useEffect(() => {
    /* 기존 타이머 정리 */
    if (stretchingTimerRef.current) {
      clearInterval(stretchingTimerRef.current);
      stretchingTimerRef.current = null;
    }

    /* 알림이 허용되고 스트레칭 알림이 활성화된 경우에만 타이머 시작 */
    if (isAllow && stretching.isEnabled && stretching.interval > 0) {
      const intervalMs = stretching.interval * 60 * 1000;

      stretchingTimerRef.current = setInterval(() => {
        showStretchingNotification();
      }, intervalMs);

      console.log(`✅ 스트레칭 알림 활성화: ${stretching.interval}분마다 알림`);
    } else {
      console.log('⏸️ 스트레칭 알림 비활성화');
    }

    /* 클린업: 컴포넌트 언마운트 시 타이머 정리 */
    return () => {
      if (stretchingTimerRef.current) {
        clearInterval(stretchingTimerRef.current);
        stretchingTimerRef.current = null;
      }
    };
  }, [isAllow, stretching.isEnabled, stretching.interval]);

  /* 거북목 타이머 설정 */
  useEffect(() => {
    if (turtleNeckTimerRef.current) {
      clearInterval(turtleNeckTimerRef.current);
      turtleNeckTimerRef.current = null;
    }

    if (isAllow && turtleNeck.isEnabled && turtleNeck.interval > 0) {
      const intervalMs = turtleNeck.interval * 60 * 1000;

      turtleNeckTimerRef.current = setInterval(() => {
        showTurtleNeckNotification();
      }, intervalMs);

      console.log(`✅ 거북목 알림 활성화: ${turtleNeck.interval}분마다 알림`);
    } else {
      console.log('⏸️ 거북목 알림 비활성화');
    }

    return () => {
      if (turtleNeckTimerRef.current) {
        clearInterval(turtleNeckTimerRef.current);
        turtleNeckTimerRef.current = null;
      }
    };
  }, [isAllow, turtleNeck.isEnabled, turtleNeck.interval]);

  /* 수동으로 알림을 트리거하는 함수들 (테스트용) */
  return {
    showStretchingNotification,
    showTurtleNeckNotification,
  };
};
