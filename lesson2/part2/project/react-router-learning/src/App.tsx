import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import PageTemplate from "./pages/PageTemplate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageTemplate />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
