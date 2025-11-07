/* 세션 생성 API 타입 */
export interface CreateSessionResponse {
  timestamp: string;
  success: boolean;
  data: {
    sessionId: string;
  };
  code: string;
  message: string;
}
