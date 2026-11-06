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
import TempProductPathlessLayout from "./pages/TempProductPathlessLayout"
function App() {
  return (
    <Routes>
      <Route element={<PageTemplate />}>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<ProductsLayout />}>
          <Route element={<TempProductPathlessLayout />}>
            <Route index element={<Products />} />
            <Route path="new" element={<CreateProduct />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
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
