import { NavLink, Outlet } from "react-router";

const PageTemplate = () => {
  return (
    <div>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active" : "")}
          end
        >
          Products
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? "active" : "")}
          end
        >
          Orders
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default PageTemplate;
