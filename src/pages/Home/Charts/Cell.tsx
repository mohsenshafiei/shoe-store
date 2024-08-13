import { useSignalEffect } from '@preact/signals-react';
import { useState } from 'react';

// Signals
import { inventorySignals } from '@stores';

// Styles
import style from './Cell.module.scss';

// Constants
const SECONDS = 1000; // 1 second

const Cell = ({ shoe, storeName }: { shoe: string; storeName: string }) => {
  const [blinkClass, setBlinkClass] = useState('');
  const shoeSignal = inventorySignals.value[storeName].value[shoe];

  useSignalEffect(() => {
    if (shoeSignal.value.count !== -1) {
      setBlinkClass(style.blink);
      const timeoutId = setTimeout(() => {
        setBlinkClass('');
      }, SECONDS);
      return () => clearTimeout(timeoutId);
    }
  });

  const isValidQuantity = shoeSignal.value.count > -1;

  return (
    <td
      style={{
        backgroundColor: shoeSignal.value.color,
      }}
      className={blinkClass}
    >
      {isValidQuantity ? shoeSignal.value.count : 'NA'}
    </td>
  );
};

export default Cell;
