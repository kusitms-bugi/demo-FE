import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { PannelHeader } from '../../../components/PannelHeader/PannelHeader';
import { ToggleSwitch } from '../../../components/ToggleSwitch/ToggleSwitch';

type HighlightPeriod = 'weekly' | 'monthly';

type HighlightDatum = {
  periodLabel: string;
  value: number;
  barKey: 'previous' | 'current';
};

const WEEKLY_DATA: HighlightDatum[] = [
  {
    periodLabel: '저번 주',
    value: 257,
    barKey: 'previous',
  },
  {
    periodLabel: '이번 주',
    value: 321,
    barKey: 'current',
  },
];

const MONTHLY_DATA: HighlightDatum[] = [
  { periodLabel: '1월', value: 210, barKey: 'current' },
  { periodLabel: '2월', value: 225, barKey: 'current' },
  { periodLabel: '3월', value: 240, barKey: 'current' },
  { periodLabel: '4월', value: 255, barKey: 'current' },
  { periodLabel: '5월', value: 270, barKey: 'current' },
  { periodLabel: '6월', value: 285, barKey: 'current' },
  { periodLabel: '7월', value: 295, barKey: 'current' },
  { periodLabel: '8월', value: 305, barKey: 'current' },
  { periodLabel: '9월', value: 312, barKey: 'current' },
  { periodLabel: '10월', value: 318, barKey: 'current' },
  { periodLabel: '11월', value: 326, barKey: 'current' },
  { periodLabel: '12월', value: 334, barKey: 'current' },
];

// CSS 변수에서 색상 가져오기
const getColor = (cssVar: string, fallback: string) => {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(cssVar)
      .trim() || fallback
  );
};

const HighlightsPanel = () => {
  const [activePeriod, setActivePeriod] = useState<HighlightPeriod>('weekly');

  // 다크모드 상태 감지
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  // CSS 변수에서 색상 가져오기 (다크모드 변경 시 재계산)
  const chartColors = useMemo(
    () => ({
      weekly: {
        previous: getColor('--color-yellow-200', '#ffe28a'),
        current: getColor('--color-sementic-brand-primary', '#ffbf00'),
      },
      monthly: {
        single: getColor('--color-sementic-brand-primary', '#ffbf00'),
      },
    }),
    [isDark],
  );

  const {
    data,
    unitLabel,
    maxDomain,
    barSize,
    barRadius,
    categoryGap,
    weeklyColors,
    monthlyColor,
    labelColor,
    labelStyle,
    labelPosition,
    gridColor,
    yAxisTickColor,
    yAxisTicks,
  } = useMemo(() => {
    const gridColorValue = getColor('--color-grey-50', '#efeeed');
    const yAxisTickColorValue = getColor('--color-grey-300', '#a8a7a4');

    if (activePeriod === 'weekly') {
      const domainPadding = 40;
      const calculatedMaxValue =
        WEEKLY_DATA.reduce(
          (acc, item) => Math.max(acc, item.value),
          0,
        ) + domainPadding;

      // 100의 배수로 올림 처리
      const maxValue = Math.ceil(calculatedMaxValue / 100) * 100;

      // 100단위로 ticks 생성
      const ticks: number[] = [];
      for (let i = 0; i <= maxValue; i += 100) {
        ticks.push(i);
      }

      return {
        data: WEEKLY_DATA,
        unitLabel: '단위: 분/일',
        maxDomain: maxValue,
        barSize: 72,
        barRadius: [16, 16, 0, 0] as [number, number, number, number],
        categoryGap: 64,
        weeklyColors: chartColors.weekly,
        monthlyColor: null,
        labelColor: getColor('--color-yellow-50', '#fff9e6'),
        labelStyle: {
          fontSize: 22,
          fontWeight: 700,
          fill: getColor('--color-yellow-50', '#fff9e6'),
        },
        labelPosition: 'center' as const,
        gridColor: gridColorValue,
        yAxisTickColor: yAxisTickColorValue,
        yAxisTicks: ticks,
      };
    }

    const domainPadding = 60;
    const calculatedMaxValue =
      MONTHLY_DATA.reduce(
        (acc, item) => Math.max(acc, item.value),
        0,
      ) + domainPadding;

    // 100의 배수로 올림 처리
    const maxValue = Math.ceil(calculatedMaxValue / 100) * 100;

    // 100단위로 ticks 생성
    const ticks: number[] = [];
    for (let i = 0; i <= maxValue; i += 100) {
      ticks.push(i);
    }

    return {
      data: MONTHLY_DATA,
      unitLabel: '단위: 분/일',
      maxDomain: maxValue,
      barSize: 28,
      barRadius: [6, 6, 0, 0] as [number, number, number, number],
      categoryGap: 24,
      weeklyColors: null,
      monthlyColor: chartColors.monthly.single,
      labelColor: getColor('--color-grey-300', '#a8a7a4'),
      labelStyle: {
        fontSize: 14,
        fontWeight: 500,
        fill: getColor('--color-grey-300', '#a8a7a4'),
      },
      labelPosition: 'top' as const,
      gridColor: gridColorValue,
      yAxisTickColor: yAxisTickColorValue,
      yAxisTicks: ticks,
    };
  }, [activePeriod, chartColors, isDark]);

  const handleToggleChange = (isMonthly: boolean) => {
    setActivePeriod(isMonthly ? 'monthly' : 'weekly');
  };

  return (
    <div className=" flex h-full flex-col rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <PannelHeader>하이라이트</PannelHeader>
        <ToggleSwitch
          uncheckedLabel="주간"
          checkedLabel="월간"
          checked={activePeriod === 'monthly'}
          onChange={handleToggleChange}
        />
      </div>
      <div className="flex items-center justify-end">
        <span className="text-caption-xs-regular text-grey-400">
          {unitLabel}
        </span>
      </div>
      <div className="mt-6 min-h-[220px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={barSize}
            barCategoryGap={categoryGap}
            margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
          >
            {weeklyColors ? (
              <defs>
                <linearGradient id="previousBarGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor={weeklyColors.previous} />
                  <stop offset="100%" stopColor={weeklyColors.previous} />
                </linearGradient>
                <linearGradient id="currentBarGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor={weeklyColors.current} />
                  <stop offset="100%" stopColor={weeklyColors.current} />
                </linearGradient>
              </defs>
            ) : null}
            <CartesianGrid
              vertical={false}
              stroke={gridColor}
              strokeDasharray="0"
            />
            <XAxis
              dataKey="periodLabel"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#a8a7a4', fontSize: 10, fontWeight: 400 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#a8a7a4', fontSize: 10, fontWeight: 400 }}
              domain={[0, maxDomain]}
              ticks={yAxisTicks}
              width={30}
            />
            <Bar
              dataKey="value"
              radius={barRadius}
              background={false}
            >
              {data.map((datum) => (
                <Cell
                  key={datum.periodLabel}
                  fill={
                    weeklyColors
                      ? datum.barKey === 'current'
                        ? 'url(#currentBarGradient)'
                        : 'url(#previousBarGradient)'
                      : monthlyColor
                  }
                />
              ))}
              <LabelList
                dataKey="value"
                position={labelPosition}
                formatter={(value: ReactNode) => {
                  if (typeof value === 'number') {
                    return value.toString();
                  }
                  if (typeof value === 'string') {
                    return value;
                  }
                  return '';
                }}
                style={labelStyle}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HighlightsPanel;
