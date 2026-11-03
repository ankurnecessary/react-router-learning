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

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageTemplate />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<CreateProduct />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId/items/:itemId" element={<OrderItem />} />
        <Route path="offers/:offerId?" element={<OfferDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
