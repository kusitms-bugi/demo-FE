import { useQuery } from '@tanstack/react-query';
import { PostureGraphResponse } from '../types';
import { mockBackend } from '@shared/mock/backend';

/**
 * 바른 자세 점수 그래프 조회 API (최근 31일)
 * GET /dashboard/posture-graph
 */
const getPostureGraph = async (): Promise<PostureGraphResponse> => {
  return mockBackend.postureGraph();
};

/**
 * 바른 자세 점수 그래프 조회 query 훅
 * @example
 * const { data, isLoading, error } = usePostureGraphQuery();
 * const points = data?.data.points;
 * // points: { "2025-01-01": 85, "2025-01-02": 92, ... }
 */
export const usePostureGraphQuery = () => {
  return useQuery({
    queryKey: ['postureGraph'],
    queryFn: getPostureGraph,
  });
};
