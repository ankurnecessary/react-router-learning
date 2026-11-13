## BrowserRouter versus MemoryRouter

| Feature                              | BrowserRouter       | MemoryRouter                   |
| ------------------------------------ | ------------------- | ------------------------------ |
| Uses browser URL                     | Yes                 | No                             |
| Uses browser history                 | Yes                 | No                             |
| Maintains navigation entries         | Yes                 | Yes, in memory                 |
| Suitable for normal web applications | Yes                 | Usually not the primary choice |
| Useful for tests                     | Yes, but more setup | Particularly useful            |

## Why is MemoryRouter useful for testing?

Imagine you want to test that /products/101 renders the Product Details page.

With MemoryRouter, you can create an isolated routing environment that starts directly at that location.

For example:

```
import { MemoryRouter, Route, Routes } from "react-router";

const TestApp = () => {
  return (
    <MemoryRouter initialEntries={["/products/101"]}>
      <Routes>
        <Route
          path="/products/:productId"
          element={<ProductDetails />}
        />
      </Routes>
    </MemoryRouter>
  );
};


Now ProductDetails receives:
const { productId } = useParams();
// productId === "101"
```

This works without changing the browser URL.

## Knowledge check

Q1. What is the main difference between BrowserRouter and MemoryRouter?
A1. BrowserRouter interacts with browser's history API but MemoryRouter is just an in memory route handler.

Q2. Does navigation inside MemoryRouter update the browser's address bar?
A2. No

Q3. What is the purpose of initialEntries?
A3. initialEntries helps in maintaining initial history list.

Q4. Given:

```
<MemoryRouter
  initialEntries={["/", "/products", "/orders"]}
  initialIndex={1}
>
```

Which route is initially active?
A4. /products

Q5. If you call navigate(-1) from the initial location in Q4, which route becomes active?
A5. / - home

Q6. Why is MemoryRouter particularly useful for testing React Router components?
A6. Because with MemoryRouter everything is happening in memory not in the browser but with the same kind of navigation behaviour that we get with BrowserRouter. So we can easily impersonate the behaviour of BrowserRouter with the help of MemoryRouter in test cases.

Q7. Should you replace BrowserRouter with MemoryRouter in your normal React dashboard? Explain.
A7. No because it doesn't work with the history API which doesn't change the actual URL in the address bar. So no URL change. We cannot share URLs with anyone to share certain information.

Complete the exercise and share your MemoryRouterDemo.tsx and answers to Q1–Q7.

## MemoryRouterDemo.tsx

```
import {
  Link,
  MemoryRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const backHandler = () => {
    navigate(-1);
  };

  const forwardHandler = () => {
    navigate(1);
  };

  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/products'>Products</Link>
      <Link to='/orders'>Orders</Link>
      <Outlet />
      <p>pathname: {location.pathname}</p>
      <button onClick={backHandler}>Back</button>
      <button onClick={forwardHandler}>Forward</button>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <h1>Home page</h1>
    </>
  );
};

const Products = () => {
  return (
    <>
      <h1>Products page</h1>
    </>
  );
};

const Orders = () => {
  return (
    <>
      <h1>Orders page</h1>
    </>
  );
};

const MemoryRouterDemo = () => {
  return (
    <MemoryRouter
      initialEntries={['/', '/products', '/orders']}
      initialIndex={1}
    >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='orders' element={<Orders />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

export default MemoryRouterDemo;
```
