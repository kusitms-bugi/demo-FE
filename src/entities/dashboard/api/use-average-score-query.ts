import { useQuery } from '@tanstack/react-query';
import { AverageScoreResponse } from '../types';
import { mockBackend } from '@shared/mock/backend';

/**
 * 평균 자세 점수 조회 API
 * GET /dashboard/average-score
 */
const getAverageScore = async (): Promise<AverageScoreResponse> => {
  return mockBackend.averageScore();
};

/**
 * 평균 자세 점수 조회 query 훅
 * @example
 * const { data, isLoading, error } = useAverageScoreQuery();
 * const score = data?.data.score;
 */
export const useAverageScoreQuery = () => {
  return useQuery({
    queryKey: ['averageScore'],
    queryFn: getAverageScore,
  });
};
