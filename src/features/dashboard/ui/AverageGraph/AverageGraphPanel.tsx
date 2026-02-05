import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { PannelHeader } from '@shared/ui/panel-header';
import { ToggleSwitch } from '@shared/ui/toggle-switch';
import { ExampleOverlay } from '@shared/ui/example-overlay';
import { useAverageGraphChart } from './hooks/useAverageGraphChart';

const AverageGraphPanel = () => {
  const {
    data,
    maxDomain,
    fillColor,
    strokeColor,
    gridColor,
    yAxisTicks,
    isMock,
  } = useAverageGraphChart();

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl p-5">
      <div className={`relative z-0 ${isMock ? 'opacity-20' : ''}`}>
        <div className="mb-4 flex items-center justify-between">
          <PannelHeader>바른 자세 점수</PannelHeader>
          <ToggleSwitch
            uncheckedLabel="주간"
            checkedLabel="월간"
            checked
            onChange={() => {}}
            disabled
          />
        </div>
        <p className="ml-auto flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-yellow-500" />
          <span className="text-caption-2xs-medium text-grey-300">점수</span>
        </p>

        {/* 시계열 그래프 */}
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, left: 0, bottom: 0, right: 0 }}
            >
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={fillColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={fillColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>
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
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#a8a7a4', fontSize: 10, fontWeight: 400 }}
                domain={[0, maxDomain]}
                ticks={yAxisTicks}
                width={30}
              />
              <Area
                type="linear"
                dataKey="score"
                stroke={strokeColor}
                strokeWidth={2}
                fill="url(#colorScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {isMock ? (
        <ExampleOverlay label="예시" />
      ) : null}
    </div>
  );
};

export default AverageGraphPanel;
