import { Outlet } from "react-router";

const ProductsLayout = () => {
  return (
    <div>
      <h1>Products Section</h1>
      <Outlet />
    </div>
  );
};

export default ProductsLayout;
