import { useSignal } from '@preact/signals-react';

// Components
import Legends from '@components/Legends';
import Cell from './Cell';

// Styles
import style from './Grid.module.scss';

// Signals
import { lastUpdateSignal } from '@stores';

// Constants
import { LEGENDS_DATA, SHOE_LIST, STORE_LIST } from '@utils/constant'; // Note: This data can be fetched from BE and saved in our store

const Grid = () => {
  const timestamp = useSignal(lastUpdateSignal);
  return (
    <div className={style.dashboard}>
      <div className={style.inventoryHeatmap}>
        <div className={style.legendsContainer}>
          <Legends legends={LEGENDS_DATA} label="Total Inventory" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Store Name</th>
              {SHOE_LIST.map((shoe: string) => (
                <th key={shoe}>{shoe}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STORE_LIST.map((storeName: string) => (
              <tr key={storeName}>
                <td>{storeName}</td>
                {SHOE_LIST.map((shoe: string) => (
                  <Cell key={shoe} shoe={shoe} storeName={storeName} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={style.lastUpdate}>Last Update on {timestamp.value}</div>
      </div>
    </div>
  );
};

export default Grid;
