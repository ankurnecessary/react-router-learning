# Exercise

Q1. Why can a route loader begin fetching data before its destination component renders, whereas useEffect cannot?

A1. Route loader function is a part of navigation life cycle in react router which is called during navigation and thats why it is fired before its destination component renders.
useEffect is a component life cycyle hook which is fired upon the completion of rendering of component or page component. So, it is fired after rendering of the page component.

Q2. What happens when a loader throws a Response with status 503 and the route has an ErrorBoundary?

A2. This is one of the case where control shifts to ErrorBoundary and we can show the error message accordingly.

Q3. Why do we pass request.signal into fetch?

A3. It helps in aborting the HTTP request's work from frontend. In case of loaders, where we use request.signal, when a user intrupts the loading of a page, like jumping from /products to /orders while products' loader HTTP request is still in progress, it aborts the products' HTTP request. However, it will not stop the request handling from the server.

Q4. Why are we attaching the loader to the products index route rather than ProductsLayout?

A4. Because if we attach it to ProductsLayout then the route loader function will fire for all of it's child routes. Whether it is index route or not.

#### Feedback

This is correct when initially entering that route hierarchy, but not necessarily when navigating between its children.

Suppose ProductsLayout has a loader:

| Navigation                          | Parent loader execution |
| ----------------------------------- | ----------------------- |
| /orders → /products                 | Yes                     |
| /orders → /products/101             | Yes                     |
| /products/101 → /products/102       | Normally no             |
| /products → /products/new           | Normally no             |
| /products?page=1 → /products?page=2 | Yes, by default         |

React Router can reuse existing parent loader data when navigating between child routes.

We will explore this behaviour further when discussing revalidation.

Q5. Suppose your dashboard already uses React Query to cache products and automatically refresh them. Would replacing that implementation with a loader necessarily improve the application? Explain your reasoning.

A5. Caching and automatica refresh are the features which are available with react Query but not with loader functions. So, it will not necessarily improve the application. But if we add our React Query to loader function then we can take advantage of all the features of both loader and React Query.

Q6. What happens if you forget to check response.ok and simply return response.json() when the API responds with HTTP 500?

A6. response.ok check helps in throwing the error response which are finally catched by the ErrorBoundary. If we are not checking it then an an unhandled error state will appear in the application.

#### Feedback:

This is the main correction to your answers.

The native fetch() function does not reject its promise simply because the server returns an HTTP error status.

Consider:

```
const response = await fetch(url);

return response.json();
```

Suppose the server returns HTTP 500 with this valid JSON:

```
{
    "message": "Internal server error"
}
```

The following happens:

1. fetch() resolves successfully.
2. response.ok is false.
3. response.json() successfully parses the error body.
4. The loader returns that body as if it were valid product data.
5. React Router renders the destination component.
   React Router does not automatically know that the API request failed.

Your component might subsequently throw an error here:
data.products.map(...)

Because data.products is undefined.

That rendering error would reach the error boundary, but it would be a secondary error rather than the original HTTP 500 error.

Share your productsLoader.ts, ApiProducts.tsx, route changes and answers to Q1–Q6.

## productsLoader.ts

```
import type { LoaderFunction, LoaderFunctionArgs } from 'react-router';
import type { ProductsResponse } from '../types/product';

const productsLoader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs): Promise<ProductsResponse> => {
  const response = await fetch('https://dummyjson.com/products?limit=10', {
    signal: request.signal,
  });

  if (!response.ok) {
    throw new Response('Cannot fetch products', {
      status: response.status,
      statusText: response.statusText,
    });
  }

  return response.json();
};

export default productsLoader;
```

## ApiProducts.tsx

```
import { useLoaderData } from 'react-router';
import type { ProductsResponse } from '../types/product';

const ApiProducts = () => {
  const data: ProductsResponse = useLoaderData();
  return (
    <div>
      <ul>
        {data.products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiProducts;
```

## DataRoutes.tsx

```
import {
  createBrowserRouter,
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
            loader: ({ request }: LoaderFunctionArgs) => {
              const url = new URL(request.url);
              const status = Number(url.searchParams.get('status'));
              if (status === 404) {
                throw new Response('Product does not exist', {
                  status,
                  statusText: 'Product not found',
                });
              } else if (status === 503) {
                throw new Response('Product service not working', {
                  status,
                  statusText: 'Product service unavailable',
                });
              }

              throw new Error('Unexpected product error');
            },
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

export const router = createBrowserRouter(routes);
```

Can you also tell me how to shorten the routes object?
