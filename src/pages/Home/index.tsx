// Style
import style from './style.module.scss';

// Components
import LowCountPercentage from './Charts/LowCountPercentage';
import InventoryByColor from './Charts/InventoryByColor';
import ShoesOutOfStock from './Charts/ShoesOutOfStock';
import TotalInventory from './Charts/TotalInventory';
import LowStock from './Charts/LowStock';
import Transfer from './Charts/Transfer';
import Grid from './Charts/Grid';

const Home: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <Grid />
      </div>
      <div className={style.wrapper}>
        <h3 className={style.title}>Urgent Shoe Inventory Alert</h3>
        <LowStock />
      </div>

      <div className={style.row}>
        <LowCountPercentage />
        <TotalInventory />
        <InventoryByColor />
      </div>
      <div className={style.wrapper}>
        <h3 className={style.title}>Out of Stocks Shoes</h3>
        <ShoesOutOfStock />
      </div>
      <div className={style.wrapper}>
        <h3 className={style.title}>Transfer Suggestion</h3>
        <Transfer />
      </div>
    </div>
  );
};

export default Home;
