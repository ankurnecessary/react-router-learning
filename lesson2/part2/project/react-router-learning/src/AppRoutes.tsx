import { Navigate, Route, Routes } from 'react-router';
import CreateProduct from './pages/CreateProduct';
import FileViewer from './pages/FileViewer';
import Home from './pages/Home';
import LegacyProduct from './pages/LegacyProduct';
import LocationDetails from './pages/LocationDetails';
import NotFound from './pages/NotFound';
import OfferDetails from './pages/OfferDetails';
import OrderItem from './pages/OrderItem';
import Orders from './pages/Orders';
import PageTemplate from './pages/PageTemplate';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import ProductsLayout from './pages/ProductsLayout';
import SearchProducts from './pages/SearchProducts';
import TempProductPathlessLayout from './pages/TempProductPathlessLayout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PageTemplate />}>
        <Route path='/' element={<Home />} />
        <Route
          path='old-products'
          element={<Navigate to='/products' replace />}
        />
        <Route path='products' element={<ProductsLayout />}>
          <Route element={<TempProductPathlessLayout />}>
            <Route index element={<Products />} />
            <Route path='new' element={<CreateProduct />} />
            <Route path=':productId' element={<ProductDetails />} />
          </Route>
        </Route>
        <Route path='legacy-product' element={<LegacyProduct />} />
        <Route
          path='legacy-product-demo'
          element={<LegacyProduct productId='101' />}
        />
        <Route path='search-products' element={<SearchProducts />} />
        <Route path='location-details' element={<LocationDetails />} />
        <Route path='orders' element={<Orders />} />
        <Route path='orders/:orderId/items/:itemId' element={<OrderItem />} />
        <Route path='offers/:offerId?' element={<OfferDetails />} />
        <Route path='files/*' element={<FileViewer />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
