## Exercise

Q1. Why might you move route definitions out of App.tsx?
A1. This is a way of separating concerns. Otherwise App.tsx would be responsible for routes and other responsibilities. This could make App.tsx hard to maintain in future.

Q2. Does moving <Routes> into AppRoutes.tsx change React Router's navigation behaviour?
A2. No, it will stay same.

Q3. Should BrowserRouter be moved into AppRoutes.tsx if it already wraps <App /> in main.tsx?
A3. No. Wrapping it twice doesn't make any sense. It will introduce bug only.

Q4. What's the advantage of grouping page components by feature?
A4. All feature specific components and files will stay at one place.

Q5. Why should you be careful when splitting nested routes across multiple <Routes> components?
A5. Because indented group of routes within <Routes> will not make the routing behave in the same way as it was doing without it.

Q6. After extracting routes into AppRoutes.tsx, why is running your existing routing tests useful?
A6. Because all the routes were working as is even after making these changes. And in <App /> we are importing <AppRoutes />, which is the same code that we were using earlier.

Complete the exercise and share your updated App.tsx, AppRoutes.tsx, and answers to Q1–Q6.

## App.tsx

```
import AppRoutes from './AppRoutes';

function App() {
  return <AppRoutes />;
}

export default App;
```

## AppRoutes.tsx

```
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
```
