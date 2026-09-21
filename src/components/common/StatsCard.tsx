import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: {
    value: string;
    isPositive: boolean;
    period: string;
  };
  sparklineData?: number[];
  colorTheme?: 'emerald' | 'charcoal' | 'amber' | 'blue';
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  sparklineData = [12, 14, 13, 16, 15, 19, 22, 24],
  colorTheme = 'emerald',
  onClick
}) => {
  // Generate SVG path for sparkline
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const width = 80;
  const height = 28;

  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  const strokeColor = trend.isPositive ? '#059669' : '#DC2626';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 p-5 shadow-subtle hover:border-slate-300 transition-all ${
        onClick ? 'cursor-pointer hover:shadow-card' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 tracking-wide uppercase">
          {title}
        </span>
        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {value}
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs">
            <span
              className={`inline-flex items-center font-medium ${
                trend.isPositive ? 'text-emerald-700' : 'text-rose-600'
              }`}
            >
              {trend.isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {trend.value}
            </span>
            <span className="text-slate-400">vs {trend.period}</span>
          </div>
        </div>

        {/* Small trend sparkline visualization */}
        <div className="shrink-0 pl-3">
          <svg width={width} height={height} className="overflow-visible">
            <polyline
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
