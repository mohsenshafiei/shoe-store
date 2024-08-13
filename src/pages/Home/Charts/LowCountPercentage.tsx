import { useComputed, useSignalEffect } from '@preact/signals-react';
import { useState } from 'react';

// Style
import style from './LowCountPercentage.module.scss';

// Computed Signal
import { lowCountPercentage } from '@stores';

// Components
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Utils
import { noop } from '@utils/helper';

// Docs
// https://recharts.org/en-US/examples/PieChartWithCustomizedLabel

const COLORS = ['#4F46E5', '#818CF8'];
const RADIAN = Math.PI / 180;
const BORDER_COLOR = '#27272a';
const CHART_HEIGHT = 200;

type CustomizedLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
};

const renderCustomizedLabel: React.FC<CustomizedLabelProps> = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

const LowCountPercentage = () => {
  const lcp = useComputed(() => lowCountPercentage.value);
  const [, setToggle] = useState(false);

  useSignalEffect(() => {
    setToggle(prev => !prev);
    noop(lcp.value);
  });

  const data = [
    { name: 'Low Count', value: lcp.value },
    { name: 'Remaining', value: 1 - lcp.value },
  ];

  return (
    <div className={style.container}>
      <h3 className={style.title}>Low Stock Percentage</h3>
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#09090b"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-lcp-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={BORDER_COLOR}
                strokeWidth={2}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LowCountPercentage;
