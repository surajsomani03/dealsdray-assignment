import { Link } from 'react-router-dom';
import { navItems } from '../static/data';
import styles from '../../styles/styles';

// eslint-disable-next-line react/prop-types
const Navbar = ({ active }) => {
  return (
    <div className={`bg-blue-600 ${styles.noramlFlex} py-2`}>
      {navItems && navItems.map((i, index) => (
        <div className="flex" key={index}>
          <Link
            to={i.url}
            className={`${
              active === index + 1 ? 'text-[#17dd1f]' : 'text-white'
            } px-6 py-3 font-medium cursor-pointer flex items-center`}
          >
            {i.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
