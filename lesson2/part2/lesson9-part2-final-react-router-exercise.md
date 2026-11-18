## Exercise

Q1. Why do we need <Outlet /> inside ProductsLayout?
A1. Because Productlayout in itself is not a page. It is a wrapper for all the product related routes and pages. So all the pages will load inside the place where <Outlet /> is placed in Productlayout.

Q2. What is the difference between useParams() and useSearchParams()?
A2. useParams() handles route params like /products/:productId. It helps in fetching productId.
useSearchParams() handles search params like /products?search=laptop&page=10. It helps in getting and setting 'search' and 'page' from the route.

Q3. From /products/101/edit, what does navigate("..") resolve to when edit is a child route of :productId? How does this differ from navigate("..", { relative: "path" }) if edit is defined as a sibling route path :productId/edit?
A3. navigate("..") will take the control to /products/101 when edit is a child route of :productId.
navigate("..", { relative: "path" }) will take the control to /products if edit is defined as a sibling route path :productId/edit.

Q4. Why should the /old-catalog redirect use replace?
A4. Because /old-catalog doesn't resemble a new route. It takes control to /products which replaces the current history entry.

Q5. Why is MemoryRouter useful for the integration tests?
A5. Because it helps in reproducing the same routing behaviour in test environment that routing produces in browser.

Q6. When should you use <Link />, useNavigate(), and <Navigate />?
A6. <Link /> is used to create a link on the page, on click of which a user is navigated.
useNavigate() also helps in navigating a user to a different page but it is used to do it programatically. We generally use it inside the handler functions.
<Navigate /> - It is basically used for URL redirection or redirection with certain conditions.

## AppRoutes.tsx

```
import { Navigate, Route, Routes } from 'react-router';
import CreateProduct from '../pages/CreateProduct';
import FileViewer from '../pages/FileViewer';
import Home from '../pages/Home';
import LegacyProduct from '../pages/LegacyProduct';
import LocationDetails from '../pages/LocationDetails';
import NotFound from '../pages/NotFound';
import OfferDetails from '../pages/OfferDetails';
import OrderItem from '../pages/OrderItem';
import Orders from '../pages/Orders';
import PageTemplate from '../pages/PageTemplate';
import ProductDetails from '../pages/ProductDetails';
import Products from '../pages/Products';
import ProductsLayout from '../pages/ProductsLayout';
import SearchProducts from '../pages/SearchProducts';
import TempProductPathlessLayout from '../pages/TempProductPathlessLayout';
import ProductEdit from '../pages/ProductEdit';

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
            <Route path=':productId/edit' element={<ProductEdit />} />
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
        <Route path='old-catalog' element={<Navigate to={'/products'} replace />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
```

## Products.tsx

```

import { Link, useNavigate, useSearchParams } from 'react-router';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const products = [
    { id: 101, name: 'Laptop' },
    { id: 102, name: 'Desktop' },
    { id: 103, name: 'Keyboard' },
  ];
  const search = searchParams.get('search') ?? 'not present';
  const page = searchParams.get('page') ?? 'not present';

  const clickHandler = (productId: number) => {
    navigate(`/products/${productId}`, {
      state: { source: 'button-navigation' },
    });
  };

  const nextPageHandler = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      const newPageNumber: string =
        String(Number(newParams.get('page')) + 1) || '0';
      newParams.set('page', newPageNumber);
      return newParams;
      // Task B: Products list
    });
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link
              to={`/products/${product.id}`}
              state={{ source: 'product-list' }}
            >
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
      <p>Search params (search): {search}</p>
      <p>Search params (page): {page}</p>
      {page !== 'not present' && (
        <button onClick={nextPageHandler}>Next page</button>
      )}
      <button
        onClick={() => {
          clickHandler(102);
        }}
      >
        Go to Desktop
      </button>
    </div>
  );
};

export default Products;
```

## ProductDetails.tsx

```
import { Link, useLocation, useParams } from 'react-router';

type ProductNavigationState = {
  source: string;
};

const ProductDetails = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const navigationState = state as ProductNavigationState | null;
  return (
    <div>
      <h1>Product Detail</h1>
      <p>{productId}</p>
      <p>Source: {navigationState?.source ?? 'Direct visit'}</p>
      <Link to='edit'>Edit Product</Link>
      <Link to='..'>Back to products</Link>
    </div>
  );
};

export default ProductDetails;
```

## ProductEdit.tsx

```
import { useNavigate, useParams } from 'react-router';

const ProductEdit = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('..', { relative: 'path' });
  };
  return (
    <>
      <h1>Product Edit page</h1>
      <p>{productId}</p>
      <button onClick={clickHandler}>Cancel</button>
    </>
  );
};

export default ProductEdit;
```

## routing.test.tsx

```
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../src/App.tsx';

const renderRoute = (route: string[]) => {
  render(
    <MemoryRouter initialEntries={route}>
      <App />
    </MemoryRouter>,
  );
};
describe('Routing', () => {
  it('/products renders the Products page', () => {
    renderRoute(['/products']);
    expect(
      screen.getByRole('heading', { name: 'Products' }),
    ).toBeInTheDocument();
  });

  it('Clicking a link from Home navigates to Products', async () => {
    const user = userEvent.setup();
    renderRoute(['/']);
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Products' }));
    expect(
      screen.getByRole('heading', { name: 'Products' }),
    ).toBeInTheDocument();
  });

  it('/products/101 displays product ID 101', () => {
    renderRoute(['/products/101']);
    expect(screen.getByText('101')).toBeInTheDocument();
  });

  it('/products/101/edit renders Edit Product with ID 101', async () => {
    const user = userEvent.setup();
    renderRoute(['/products/101/edit']);
    expect(
      screen.getByRole('heading', { name: 'Product Edit page', level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText('101')).toBeInTheDocument();
    await user.click(
      screen.getByRole('button', {
        name: 'Cancel',
      }),
    );
    expect(screen.getByRole('heading', { name: 'Product Detail', level: 1 }));
  });

  it('/unknown-route renders NotFound', () => {
    renderRoute(['/unknown-route']);
    expect(
      screen.getByRole('heading', { name: '404 - Page not found' }),
    ).toBeInTheDocument();
  });

  it('/old-catalog redirects to /products', () => {
    renderRoute(['/old-catalog']);
    expect(
      screen.getByRole('heading', {
        name: 'Products',
        level: 1,
      }),
    );
  });

  it('/old-products redirects to /products using <Navigate replace />', async () => {
    renderRoute(['/old-products']);
    expect(
      await screen.findByRole('heading', { name: 'Products' }),
    ).toBeInTheDocument();
  });
});
```
