import {
  Navigate,
  type LoaderFunctionArgs,
  type RouteObject,
} from 'react-router';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Orders from '../pages/Orders';
import PageTemplate from '../pages/PageTemplate';
import ProductsLayout from '../pages/ProductsLayout';
import CreateProduct from '../pages/CreateProduct';
import ProductDetails from '../pages/ProductDetails';
import ProductEdit from '../pages/ProductEdit';
import LegacyProduct from '../pages/LegacyProduct';
import SearchProducts from '../pages/SearchProducts';
import LocationDetails from '../pages/LocationDetails';
import OrderItem from '../pages/OrderItem';
import OfferDetails from '../pages/OfferDetails';
import FileViewer from '../pages/FileViewer';
import NotFound from '../pages/NotFound';
import ProductErrorDemo from '../pages/ProductErrorDemo';
import ProductErrorPage from '../pages/errors/ProductErrorPage';
import AppErrorPage from '../pages/errors/AppErrorPage';
import RenderErrorDemo from '../pages/RenderErrorDemo';
import productsLoader from '../loaders/productsLoader';
import ApiProducts from '../pages/ApiProducts';
import { productErrorDemoLoader } from '../loaders/productErrorDemoLoader';

export const routes: RouteObject[] = [
  {
    Component: PageTemplate,
    ErrorBoundary: AppErrorPage,
    children: [
      { path: '/', Component: Home },
      { path: 'old-products', element: <Navigate to='/products' replace /> },
      {
        path: 'products',
        Component: ProductsLayout,
        ErrorBoundary: ProductErrorPage,
        children: [
          { index: true, Component: Products },
          {
            path: 'api-products',
            Component: ApiProducts,
            loader: productsLoader,
          },
          { path: 'new', Component: CreateProduct },
          { path: ':productId', Component: ProductDetails },
          { path: ':productId/edit', Component: ProductEdit },
          { path: 'render-error-demo', Component: RenderErrorDemo },
          {
            path: 'error-demo',
            Component: ProductErrorDemo,
            loader: productErrorDemoLoader,
          },
        ],
      },
      { path: 'legacy-product', Component: LegacyProduct },
      {
        path: 'legacy-product-demo',
        element: <LegacyProduct productId='101' />,
      },
      { path: 'search-products', Component: SearchProducts },
      { path: 'location-details', Component: LocationDetails },
      { path: 'orders', Component: Orders },
      { path: 'orders/:orderId/items/:itemId', Component: OrderItem },
      { path: 'offers/:offerId', Component: OfferDetails },
      { path: 'files/*', Component: FileViewer },
      { path: 'old-catalog', element: <Navigate to={'/products'} replace /> },
      { path: '*', Component: NotFound },
    ],
  },
];
