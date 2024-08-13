import { useComputed, useSignalEffect, useSignal } from '@preact/signals-react';
import { useState } from 'react';

// Signal
import { lastUpdateSignal } from '@stores';

// Computed Signal
import { suggestTransfers } from '@stores';

// Styles
import style from './Transfer.module.scss';

// Utils
import { noop } from '@utils/helper';

// Types
import { TransferData } from '@stores';

const Transfer = () => {
  const st = useComputed(() => suggestTransfers.value);
  const [, setToggle] = useState(false);
  const timestamp = useSignal(lastUpdateSignal);

  useSignalEffect(() => {
    setToggle(prev => !prev);
    noop(st.value);
  });

  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th>From Store</th>
            <th>To Store</th>
            <th>Shoe Model</th>
            <th>Transfer Quantity</th>
          </tr>
        </thead>
        <tbody>
          {st.value.map((transfer: TransferData, index: number) => (
            <tr key={index}>
              <td>{transfer.fromStore}</td>
              <td>{transfer.toStore}</td>
              <td>{transfer.shoe}</td>
              <td>{transfer.transferCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={style.lastUpdate}>Last Update on {timestamp.value}</div>
    </div>
  );
};

export default Transfer;
