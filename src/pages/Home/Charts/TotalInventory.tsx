import { useComputed, useSignalEffect } from '@preact/signals-react';
import { useState } from 'react';

// Style
import style from './TotalInventory.module.scss';

// Computed Signal
import { totalInventory } from '@stores';

// Utils
import { noop } from '@utils/helper';

// Components
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Docs
// https://recharts.org/en-US/examples/PieChartWithNeedle

const RADIAN = Math.PI / 180;
const BORDER_COLOR = '#27272a';
const cx = 181;
const cy = 132;
const iR = 50;
const oR = 100;
const MAX_VALUE = 12000;

type DataEntry = {
  value: number;
  color: string;
};

const needle = (
  value: number,
  data: DataEntry[],
  cx: number,
  cy: number,
  iR: number,
  oR: number,
  color: string,
): JSX.Element[] => {
  let total = 0;
  data.forEach(v => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path
      key="path"
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="none"
      fill={color}
    />,
  ];
};

const TotalInventory = () => {
  const ti = useComputed(() => totalInventory.value);
  const [, setToggle] = useState(false);

  useSignalEffect(() => {
    setToggle(prev => !prev);
    noop(ti.value);
  });

  const data = [
    { name: 'Total Inventory', value: ti.value, color: '#4F46E5' },
    {
      name: 'Remaining Capacity',
      value: MAX_VALUE - ti.value,
      color: '#818CF8',
    },
  ];

  return (
    <div className={style.container}>
      <h3 className={style.title}>Total Inventory</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-ti-${index}`}
                fill={entry.color}
                stroke={BORDER_COLOR}
                strokeWidth={2}
              />
            ))}
          </Pie>
          {needle(ti.value, data, cx, cy, iR, oR, '#ffe4e6')}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalInventory;
