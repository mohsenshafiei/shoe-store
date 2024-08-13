import { Link } from 'react-router-dom';

// Styles
import style from './style.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={style.container}>
      <h1 className={style.label}>Not Found! :(</h1>
      <Link className={style.link} to="/">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
