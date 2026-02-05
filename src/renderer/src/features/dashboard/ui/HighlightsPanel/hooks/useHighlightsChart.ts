import { useThemeApplied } from '@shared/hooks/use-theme-applied';
import { getColor } from '@shared/lib/get-color';
import { useMemo } from 'react';
import { MONTHLY_DATA, type HighlightDatum } from '../data';

type ChartColors = {
  previous: string;
  current: string;
};

type ChartConfig = {
  data: HighlightDatum[];
  unitLabel: string;
  maxDomain: number;
  barSize: number;
  barRadius: [number, number, number, number];
  categoryGap: number;
  chartColors: ChartColors;
  isMock: boolean;
  // 라벨 색 분리
  labelColor: string; // current(이번 주/달) 라벨 색
  previousLabelColor: string; // previous(저번 주/달) 라벨 색
  labelStyle: {
    fontSize: number;
    fontWeight: number;
    fill: string;
  };
  labelPosition: 'center' | 'top' | 'insideTop';
  gridColor: string;
  yAxisTickColor: string;
  yAxisTicks: number[];
};

export function useHighlightsChart(): ChartConfig {
  const isDarkApplied = useThemeApplied();

  const chartData = useMemo<HighlightDatum[]>(() => MONTHLY_DATA, []);

  // CSS 변수에서 색상 가져오기 (다크모드 변경 시 재계산)
  const chartColors = useMemo<ChartColors>(
    () => ({
      previous: getColor(
        '--color-grey-100',
        isDarkApplied ? '#2d2c2a' : '#e3e1df',
      ), // 저번 주/달 바 색
      current: getColor('--color-sementic-brand-primary', '#ffbf00'), // 이번 주/달 바 색
    }),
    [isDarkApplied],
  );

  const chartConfig = useMemo<ChartConfig>(() => {
    const gridColorValue = getColor(
      '--color-grey-50',
      isDarkApplied ? '#2d2c2a' : '#efeeed',
    );
    const yAxisTickColorValue = getColor(
      '--color-grey-300',
      isDarkApplied ? '#a8a7a4' : '#a8a7a4',
    );

    const currentLabelColor = getColor(
      '--color-yellow-50',
      isDarkApplied ? '#fff9e6' : '#fff9e6',
    ); // 이번 주/달 라벨
    const prevLabelColor = getColor(
      '--color-grey-0',
      isDarkApplied ? '#ffffff' : '#ffffff',
    ); // 저번 주/달 라벨

    // 공통 스타일
    const baseConfig = {
      unitLabel: '단위: 분/일',
      barSize: 130,
      barRadius: [8, 8, 0, 0] as [number, number, number, number],
      categoryGap: 64,
      chartColors,
      labelColor: currentLabelColor,
      previousLabelColor: prevLabelColor,
      labelStyle: {
        fontSize: 22,
        fontWeight: 700,
        fill: currentLabelColor,
      },
      labelPosition: 'center' as const,
      gridColor: gridColorValue,
      yAxisTickColor: yAxisTickColorValue,
    };

    const domainPadding = 40;

    const calculatedMaxValue =
      chartData.length > 0
        ? chartData.reduce((acc, item) => Math.max(acc, item.value), 0) +
          domainPadding
        : domainPadding;
    const maxValue = Math.ceil(calculatedMaxValue / 100) * 100;
    const ticks: number[] = Array.from(
      { length: maxValue / 100 + 1 },
      (_, i) => i * 100,
    );

    return {
      ...baseConfig,
      data: chartData,
      maxDomain: maxValue,
      yAxisTicks: ticks,
      isMock: true,
    };
  }, [chartColors, chartData, isDarkApplied]);

  return chartConfig;
}
