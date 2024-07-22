import { Outlet } from 'react-router-dom';
import Header from '../Layout/Header';
import Navbar from '../Layout/Navbar';

// eslint-disable-next-line react/prop-types
const Layout = ({ activeHeading }) => {
  return (
    <>
      <Header activeHeading={activeHeading} />
      <Navbar active={activeHeading} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
