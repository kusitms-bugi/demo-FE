import { Outlet } from 'react-router-dom';
import DevNavbar from '../components/DevNavbar/DevNavbar';
import Header from './Header/Header';

const Layout = () => {
  return (
    <div className="hbp:pt-[75px] min-h-screen pt-15">
      <DevNavbar />
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
