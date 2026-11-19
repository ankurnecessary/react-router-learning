import { type RouteObject } from 'react-router';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Orders from '../pages/Orders';

export const routes: RouteObject[] = [
  { path: '/', Component: Home },
  { path: '/products', Component: Products },
  { path: '/orders', Component: Orders },
];
