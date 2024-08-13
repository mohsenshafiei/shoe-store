// Styles
import style from './style.module.scss';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export const Navbar: React.FC = () => {
  return (
    <div className={style.navbar}>
      <Link className={clsx(style.link, style.main)} to="/">
        ALDO
      </Link>
      <div className={style.nav}>
        <Link className={style.link} to="/">
          Overview
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
