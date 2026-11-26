import type { RouteObject } from 'react-router';
import { productErrorDemoLoader } from '../loaders/productErrorDemoLoader';
import productsLoader from '../loaders/productsLoader';
import ApiProducts from '../pages/ApiProducts';
import CreateProduct from '../pages/CreateProduct';
import ProductErrorPage from '../pages/errors/ProductErrorPage';
import ProductDetails from '../pages/ProductDetails';
import ProductEdit from '../pages/ProductEdit';
import ProductErrorDemo from '../pages/ProductErrorDemo';
import Products from '../pages/Products';
import ProductsLayout from '../pages/ProductsLayout';
import RenderErrorDemo from '../pages/RenderErrorDemo';

export const productRoutes: RouteObject = {
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
};
