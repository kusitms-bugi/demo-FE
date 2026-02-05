import { useQuery } from '@tanstack/react-query';
import { PosturePatternResponse } from '../types';
import { mockBackend } from '@shared/mock/backend';

/**
 * 자세 패턴 분석 조회 API
 * GET /dashboard/posture-pattern
 */
const getPosturePattern = async (): Promise<PosturePatternResponse> => {
  return mockBackend.posturePattern();
};

/**
 * 자세 패턴 분석 조회 query 훅
 * @example
 * const { data, isLoading, error } = usePosturePatternQuery();
 * const worstTime = data?.data.worstTime;
 * const worstDay = data?.data.worstDay;
 */
export const usePosturePatternQuery = () => {
  return useQuery({
    queryKey: ['posturePattern'],
    queryFn: getPosturePattern,
    staleTime: 1000 * 60 * 5, // 5분간 데이터 신선하게 유지
    retry: 1, // 실패 시 1번만 재시도
  });
};
