import { NavLink, Outlet } from 'react-router';
import NavigationDetails from './NavigationDetails';

const PageTemplate = () => {
  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to='/products'
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
        >
          Products
        </NavLink>
        <NavLink
          to='/products/api-products'
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
        >
          API Products
        </NavLink>
        <NavLink
          to='/products/new'
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
        >
          Create Product
        </NavLink>
        <NavLink
          to='/orders'
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
        >
          Orders
        </NavLink>
      </nav>
      <Outlet />
      <NavigationDetails />
    </div>
  );
};

export default PageTemplate;
