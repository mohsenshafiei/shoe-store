import { useComputed, useSignalEffect } from '@preact/signals-react';
import { useState } from 'react';

// Style
import style from './LowStock.module.scss';

// Computed Signal
import { lowStockShoes } from '@stores';

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

// Utils
import { getColorForLowStock, noop } from '@utils/helper';

// Docs
// https://recharts.org/en-US/examples/TinyBarChart

type TooltipPayload = {
  shoe: string;
  store: string;
  count: number;
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    payload: TooltipPayload;
  }>;
};

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { shoe, store, count } = payload[0].payload;
    return (
      <div className={style.tooltip}>
        <p>{`${shoe} - ${store}`}</p>
        <p>{`${count === 0 ? 'Out of Stock' : `${count} Available`}`}</p>
      </div>
    );
  }
  return null;
};

const LowStock = () => {
  const lowStock = useComputed(() => lowStockShoes.value);
  const [, setToggle] = useState(false);

  useSignalEffect(() => {
    setToggle(prev => !prev);
    noop(lowStock.value);
  });

  return (
    <div className={style.container}>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={lowStock.value}>
            <XAxis dataKey="shoe" style={{ fontSize: '12px' }} />
            <YAxis domain={[0, 12]} style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count">
              {lowStock.value.map((entry: { count: number }, index: number) => (
                <Cell
                  key={`cell-ls-${index}`}
                  fill={getColorForLowStock(entry.count)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LowStock;
