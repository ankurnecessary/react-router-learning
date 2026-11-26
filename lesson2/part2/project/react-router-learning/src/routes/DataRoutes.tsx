import { type RouteObject } from 'react-router';
import Home from '../pages/Home';
import PageTemplate from '../pages/PageTemplate';
import SearchProducts from '../pages/SearchProducts';
import LocationDetails from '../pages/LocationDetails';
import OfferDetails from '../pages/OfferDetails';
import FileViewer from '../pages/FileViewer';
import NotFound from '../pages/NotFound';
import AppErrorPage from '../pages/errors/AppErrorPage';
import { productRoutes } from './productRoutes';
import { orderRoutes } from './orderRoutes';
import { legacyRoutes } from './legacyRoutes';

export const routes: RouteObject[] = [
  {
    Component: PageTemplate,
    ErrorBoundary: AppErrorPage,
    children: [
      { path: '/', Component: Home },
      productRoutes,
      ...orderRoutes,
      ...legacyRoutes,
      { path: 'search-products', Component: SearchProducts },
      { path: 'location-details', Component: LocationDetails },
      { path: 'offers/:offerId', Component: OfferDetails },
      { path: 'files/*', Component: FileViewer },
      { path: '*', Component: NotFound },
    ],
  },
];
