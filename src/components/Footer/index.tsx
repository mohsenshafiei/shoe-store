// Styles
import style from './style.module.scss';

const Footer: React.FC = () => {
  const date = new Date();
  return (
    <footer className={style.footer}>
      <div>
        <p>&copy; {date.getFullYear()} ALDO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
