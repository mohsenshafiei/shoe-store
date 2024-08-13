import { useComputed, useSignalEffect } from '@preact/signals-react';
import { useState } from 'react';

// Style
import style from './InventoryByColor.module.scss';

// Computed Signal
import { inventoryByColor } from '@stores';

// Components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import Legends from '@components/Legends';

// Utils
import { noop, getLabelByColor } from '@utils/helper';

// Constants
import { LEGENDS_DATA } from '@utils/constant';

type TooltipPayload = {
  color: string;
  count: number;
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    payload: TooltipPayload;
  }>;
};

const CHART_HEIGHT = 300;

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { color, count } = payload[0].payload;
    return (
      <div className={style.tooltip}>
        <p>{`${getLabelByColor(color)}`}</p>
        <p>{`${count} Items`}</p>
      </div>
    );
  }
  return null;
};

const InventoryByColor = () => {
  const colorData = useComputed(() => {
    const colorMap = inventoryByColor.value;
    return Object.keys(colorMap).map(color => ({
      color,
      count: colorMap[color],
      label: getLabelByColor(color),
    }));
  });

  const [, setToggle] = useState(false);

  useSignalEffect(() => {
    setToggle(prev => !prev);
    noop(colorData.value);
  });

  return (
    <div className={style.container}>
      <div className={style.legendsContainer}>
        <Legends legends={LEGENDS_DATA} label="Inventory By Color" />
      </div>
      <div style={{ width: '100%', height: CHART_HEIGHT }}>
        <ResponsiveContainer>
          <BarChart data={colorData.value}>
            <XAxis dataKey="label" style={{ fontSize: '12px' }} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count">
              {colorData.value.map((entry, index) => (
                <Cell key={`cell-color-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryByColor;
