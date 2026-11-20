## Exercise

Q1. In a route object, what is the equivalent of nesting <Route> elements inside a parent <Route>?
A1. {path: '...', children: [...]}. Here `children` is the property that works for nesting routes.

Q2. Why does PageTemplate not need a path?
A2. We are using it as a pathless route component which is getting used only for layouting purpose.

Q3. If ProductsLayout does not render <Outlet />, what happens when navigating to /products/101?
A3. Without <Outlet /> rendering none of the children routes will load.

Q4. For the route /products/101/edit, what would useParams() return?
A4. `const {productId} = useParams();`
For `/products/101/edit`, assuming the route definition is:
`{ path: ':productId/edit', Component: ProductEdit }`

Then:

```
const params = useParams();
```

returns an object equivalent to:

```
{ productId: '101' }
```

Q5. Does changing from Declarative Mode to Data Mode change how Link, useNavigate or useParams work?
A5. No.

Q6. Why might it be useful to attach a loader to the parent products route rather than attaching independent loaders to every child route? Think about shared data requirements. We haven't covered loader implementation yet, so reason conceptually.
A6. If there is a data requirement that needs to be loaded on all the child route then /products route is the place. But if there is a nything specific to the child routes then loader should be called separately on the child routes.

Q7. In your route configuration, why does path: 'products' work correctly even though it doesn't begin with /?
A7. This is because React Router supports relative route paths in nested route configurations.

Consider your route hierarchy:

```
const routes: RouteObject[] = [
  {
    Component: PageTemplate,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: 'products',
        Component: ProductsLayout,
        children: [
          {
            index: true,
            Component: Products,
          },
          {
            path: ':productId',
            Component: ProductDetails,
          },
        ],
      },
    ],
  },
];
```

Your PageTemplate is pathless, meaning it doesn't add any URL segment.

Therefore, products is resolved at the root of the URL hierarchy:
/products

And :productId is resolved relative to its parent route:
/products/:productId

Q8. Is this valid, and why?

```
{
  path: 'dashboard',
  children: [
    {
      path: '/products',
      Component: Products,
    },
  ],
}
```

A8. An absolute child path must start with the complete path of its parent. Therefore, /products is invalid under dashboard. A valid absolute child path would be /dashboard/products.
Complete the exercise and share your updated DataRoutes.tsx and Q1–Q6 answers.

I have deleted DataRouter.tsx and added it's code in DataRoutes.tsx

## DataRoutes.tsx

```
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';
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

const routes: RouteObject[] = [
  {
    Component: PageTemplate,
    children: [
      { path: '/', Component: Home },
      { path: 'old-products', element: <Navigate to='/products' /> },
      {
        path: 'products',
        Component: ProductsLayout,
        children: [
          { index: true, Component: Products },
          { path: 'new', Component: CreateProduct },
          { path: ':productId', Component: ProductDetails },
          { path: ':productId/edit', Component: ProductEdit },
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

export const router = createBrowserRouter(routes);
```
