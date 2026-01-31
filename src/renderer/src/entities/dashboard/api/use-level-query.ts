import { useQuery } from '@tanstack/react-query';
import { LevelResponse } from '../types';
import { mockBackend } from '@shared/mock/backend';

/**
 * 레벨 도달 현황 조회 API
 * GET /dashboard/level
 */
const getLevel = async (): Promise<LevelResponse> => {
  return mockBackend.level();
};

/**
 * 레벨 도달 현황 조회 query 훅
 * @example
 * const { data, isLoading, error } = useLevelQuery();
 * const level = data?.data.level;
 * const current = data?.data.current;
 * const required = data?.data.required;
 */
export const useLevelQuery = () => {
  return useQuery({
    queryKey: ['level'],
    queryFn: getLevel,
  });
};
