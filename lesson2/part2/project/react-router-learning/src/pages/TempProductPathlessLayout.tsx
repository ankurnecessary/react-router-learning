import { Outlet } from "react-router";

const ProductPathlessLayout = () => {
  return (
    <div>
      <h1>Product pathless layout</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ProductPathlessLayout;
