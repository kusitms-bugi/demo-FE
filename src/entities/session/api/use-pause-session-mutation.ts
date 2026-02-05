import { useMutation } from '@tanstack/react-query';
import { SessionActionResponse } from '../types';
import { mockBackend } from '@shared/mock/backend';

/**
 * 세션 일시정지 API
 */
const pauseSession = async (
  sessionId: string,
): Promise<SessionActionResponse> => {
  return mockBackend.pauseSession(sessionId);
};

/**
 * 세션 일시정지 mutation 훅
 * @example
 * const { mutate: pauseSession } = usePauseSessionMutation();
 * const sessionId = localStorage.getItem('sessionId');
 * pauseSession(sessionId);
 */
export const usePauseSessionMutation = () => {
  return useMutation({
    mutationFn: pauseSession,
    onSuccess: () => {
      console.log('세션 일시정지 성공');
    },
    onError: (error) => {
      console.error('세션 일시정지 오류:', error);
    },
  });
};
