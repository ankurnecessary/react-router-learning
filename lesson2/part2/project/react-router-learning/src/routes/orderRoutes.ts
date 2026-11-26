import type { RouteObject } from 'react-router';
import OrderItem from '../pages/OrderItem';
import Orders from '../pages/Orders';

export const orderRoutes: RouteObject[] = [
  { path: 'orders', Component: Orders },
  { path: 'orders/:orderId/items/:itemId', Component: OrderItem },
];
