// Layout.jsx
import { Outlet } from 'react-router-dom';

// Components
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

// Styles
import style from './style.module.scss';

const Layout: React.FC = () => {
  return (
    <div className={style.layout}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
