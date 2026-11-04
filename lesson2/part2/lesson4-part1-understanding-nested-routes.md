Q1. For /products/101, which components in the route hierarchy will render?
A1. <PageTemplate /> -> <ProductsLayout /> -> <ProductDetails /> 

Q2. What happens if you remove <Outlet /> from ProductsLayout?
A2. It will render only heading "Products Section" and not the components tied to the route definition.

Q3. Why do we use an index route for the Products list rather than defining another child route with path="products"?
A3. Because that practice will make the code more verbose and confusing. `index` route just tie the route with the parent route's `path`.

Q4. Does an index route add a URL segment?
A4. No

Q5. Suppose you have:
```
<Route path="products" element={<ProductsLayout />}>
    <Route index element={<Products />} />
    <Route path=":productId" element={<ProductDetails />} />
</Route>
```

What renders for /products and what renders for /products/45?
A5. /products -> ProductsLayout -> Products
/products/45 -> ProductsLayout -> ProductDetails

Complete the exercise and share your updated App.tsx, ProductsLayout.tsx, and answers to Q1–Q5.

App.tsx
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import PageTemplate from "./pages/PageTemplate";
import CreateProduct from "./pages/CreateProduct";
import ProductDetails from "./pages/ProductDetails";
import OrderItem from "./pages/OrderItem";
import OfferDetails from "./pages/OfferDetails";
import FileViewer from "./pages/FileViewer";
import ProductsLayout from "./pages/ProductsLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageTemplate />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsLayout />}>
          <Route index element={<Products />} />
          <Route path="new" element={<CreateProduct />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId/items/:itemId" element={<OrderItem />} />
        <Route path="offers/:offerId?" element={<OfferDetails />} />
        <Route path="files/*" element={<FileViewer />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

ProductsLayout.tsx

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
