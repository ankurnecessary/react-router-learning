import { Navigate, type RouteObject } from 'react-router';
import LegacyProduct from '../pages/LegacyProduct';

export const legacyRoutes: RouteObject[] = [
  { path: 'old-catalog', element: <Navigate to='/products' replace /> },
  { path: 'old-products', element: <Navigate to='/products' replace /> },
  { path: 'legacy-product', Component: LegacyProduct },
  {
    path: 'legacy-product-demo',
    element: <LegacyProduct productId='101' />,
  },
];
