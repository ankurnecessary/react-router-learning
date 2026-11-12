Q1. What is the main difference between <Navigate /> and useNavigate()?
A1. <Navigate /> is a component which we need to return from a component to redirect the route.
useNavigate() - returns a function that can be used to navigate to other route programatically via functions / event handlers.

Q2. What happens when React renders:
<Navigate to="/orders" replace />
A2. Control navigates to /orders and the current url gets replaced by /orders.


Q3. Suppose browser history is:
/ → /old-products


The /old-products route renders:
<Navigate to="/products" replace />


After the redirect, where will the browser Back button take you?
A3. / - home

Q4. What problem might occur if we omit replace from a redirecting route?

A4. Omitting replace creates another history entry. Pressing Back can return to /old-products, which redirects forward to /products again. This can create an unpleasant navigation loop.

Q5. Given this route hierarchy:
<Route path="products" element={<ProductsLayout />}>
  <Route path=":productId" element={<ProductDetails />} />
</Route>

Inside ProductDetails, what URL does the following resolve to?
<Navigate to=".." replace />
A5. /products because of the route hierarchy.

Q6. Can <Navigate /> be rendered conditionally? Give one example of when that might be useful.
A6. Yes, it can be rendered conditionally. Suppose there is a route users/:userId. Now, after  HTTP request if we find that a particular :userId doesn't exist then we can send a user back to /users route showing the list of users.

Complete the exercise and share your App.tsx, LegacyProduct.tsx, and answers to Q1–Q6.

App.tsx

import { Navigate, Route, Routes } from "react-router";
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
import TempProductPathlessLayout from "./pages/TempProductPathlessLayout";
import SearchProducts from "./pages/SearchProducts";
import LegacyProduct from "./pages/LegacyProduct";
function App() {
  return (
    <Routes>
      <Route element={<PageTemplate />}>
        <Route path="/" element={<Home />} />
        <Route path="old-products" element={<Navigate to='/products' replace />} />
        <Route path="products" element={<ProductsLayout />}>
          <Route element={<TempProductPathlessLayout />}>
            <Route index element={<Products />} />
            <Route path="new" element={<CreateProduct />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
        </Route>
        <Route path="legacy-product" element={<LegacyProduct />} />
        <Route path="legacy-product-demo" element={<LegacyProduct productId='1234'/>} />
        <Route path="search-products" element={<SearchProducts />} />
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

LegacyProduct.tsx


import { Navigate } from 'react-router';

type LegacyProductProps = {
  productId?: string;
};
const LegacyProduct = ({ productId }: LegacyProductProps) => {
  // productId = '1'; // Try to toggle the commenting
  if (!productId) {
    return <Navigate to='/products' replace />;
  }
  return <div>Legacy Product: {productId}</div>;
};

export default LegacyProduct;
