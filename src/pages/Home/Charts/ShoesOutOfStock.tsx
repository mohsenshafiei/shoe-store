import { useComputed, useSignalEffect, useSignal } from '@preact/signals-react';
import { useState } from 'react';

// Signal
import { lastUpdateSignal } from '@stores';

// Computed Signal
import { shoesOutOfStock } from '@stores';

// Styles
import style from './ShoesOutOfStock.module.scss';

// Utils
import { noop } from '@utils/helper';

const ShoesOutOfStock = () => {
  const outOfStockShoes = useComputed(() => shoesOutOfStock.value);
  const [, setToggle] = useState(false);
  const timestamp = useSignal(lastUpdateSignal);

  useSignalEffect(() => {
    setToggle(prev => !prev);
    noop(outOfStockShoes.value);
  });

  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th>Store</th>
            <th>Shoe Model</th>
          </tr>
        </thead>
        <tbody>
          {outOfStockShoes.value.map(
            (item: { shoe: string; store: string }, index: number) => (
              <tr key={index}>
                <td>{item.store}</td>
                <td>{item.shoe}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <div className={style.lastUpdate}>Last Update on {timestamp.value}</div>
    </div>
  );
};

export default ShoesOutOfStock;
