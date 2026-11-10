import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/old-products">Old Products</Link>
    </div>
  );
};

export default Home;
