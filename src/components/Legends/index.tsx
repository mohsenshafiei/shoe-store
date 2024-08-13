// Styles
import style from './style.module.scss';

// Types
type Legend = {
  id: string;
  label: string;
  color: string;
};

type LegendProps = Legend;
type LegendsProps = { legends: Legend[]; label?: string };

const Legend: React.FC<LegendProps> = (props: LegendProps) => {
  const { color, id, label } = props;
  return (
    <div key={id} className={style.legendItem}>
      <span
        className={style.legendColor}
        style={{ backgroundColor: color }}
      ></span>
      <span>{label}</span>
    </div>
  );
};

const Legends = (props: LegendsProps) => {
  const { label = 'Legends', legends } = props;
  return (
    <div className={style.legendsContainer}>
      <div className={style.legendsLabel}>{label}</div>
      <div className={style.legends}>
        {legends.map((legend: Legend) => (
          <Legend
            key={legend.id}
            id={legend.id}
            label={legend.label}
            color={legend.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Legends;
