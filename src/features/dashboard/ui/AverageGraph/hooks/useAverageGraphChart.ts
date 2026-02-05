import { useThemeApplied } from '@shared/hooks/use-theme-applied';
import { getColor } from '@shared/lib/get-color';
import { useMemo } from 'react';

type AverageGraphDatum = {
  periodLabel: string;
  score: number;
};

type ChartConfig = {
  data: AverageGraphDatum[];
  maxDomain: number;
  fillColor: string;
  strokeColor: string;
  gridColor: string;
  yAxisTicks: number[];
  isMock: boolean;
};

const MOCK_SCORES_12 = [38, 42, 50, 47, 55, 63, 52, 68, 61, 74, 70, 66] as const;

export function useAverageGraphChart() {
  const isDarkApplied = useThemeApplied();

  /* 그래프 색상 */
  const chartConfig = useMemo<ChartConfig>(() => {
    const gridColorValue = getColor(
      '--color-grey-50',
      isDarkApplied ? '#2d2c2a' : '#efeeed',
    );
    const fillColorValue = getColor(
      '--color-yellow-200',
      isDarkApplied ? '#8a6a00' : '#ffe28a',
    );
    const strokeColorValue = getColor(
      '--color-sementic-brand-primary',
      '#ffbf00',
    );

    /* API 데이터를 그래프 형식으로 변환 */
    const data: AverageGraphDatum[] = MOCK_SCORES_12.map((score, index) => ({
      periodLabel: (index + 1).toString(),
      score,
    }));

    /* 최댓값 100 */
    const domainMax = 100;

    /* y축 눈금 */
    const ticks: number[] = [25, 50, 75, 100];

    return {
      data,
      maxDomain: domainMax,
      fillColor: fillColorValue,
      strokeColor: strokeColorValue,
      gridColor: gridColorValue,
      yAxisTicks: ticks,
      isMock: true,
    };
  }, [isDarkApplied]);

  return chartConfig;
}
