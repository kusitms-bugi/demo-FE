import { mockBackend } from '@shared/mock/backend';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { AttendanceQueryParams, AttendanceResponse } from '../types';

/**
 * 출석 현황 조회 API
 * GET /dashboard/attendance
 */
const getAttendance = async (
  params: AttendanceQueryParams,
): Promise<AttendanceResponse> => {
  return mockBackend.attendance(params);
};

const attendanceQueryKey = (params: AttendanceQueryParams) => [
  'attendance',
  params.period,
  params.year,
  params.month,
] as const;

/**
 * 출석 현황 조회 query 훅
 * @param params - 조회 파라미터 (period, year, month)
 * @param enabled - 쿼리 실행 여부 (기본값: true)
 * @example
 * const { data, isLoading, error } = useAttendanceQuery({
 *   period: 'MONTHLY',
 *   year: 2025,
 *   month: 11
 * });
 * const attendances = data?.data.attendances;
 * const title = data?.data.title;
 */
export const useAttendanceQuery = (
  params: AttendanceQueryParams,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: attendanceQueryKey(params),
    queryFn: () => getAttendance(params),
    enabled: enabled && !!params.year,
    staleTime: 1000 * 60 * 5, // 5분간 데이터 신선하게 유지
    retry: 1, // 실패 시 1번만 재시도
  });
};

export const useAttendanceSuspenseQuery = (params: AttendanceQueryParams) => {
  return useSuspenseQuery({
    queryKey: attendanceQueryKey(params),
    queryFn: () => getAttendance(params),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
