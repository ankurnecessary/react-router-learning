import { NavLink } from "react-router";

const Home = () => {
  return (
    <div>
      <nav>
        <NavLink to="/" className={(isActive) => isActive && "active"} end>
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={(isActive) => isActive && "active"}
          end
        >
          Products
        </NavLink>
        <NavLink
          to="/orders"
          className={(isActive) => isActive && "active"}
          end
        >
          Orders
        </NavLink>
      </nav>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
