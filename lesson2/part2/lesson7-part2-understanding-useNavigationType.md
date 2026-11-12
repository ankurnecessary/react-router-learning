Q1. What does useNavigationType() return?
A1. It returns the navigation type like push, pop and replace.

Q2. What is the difference between PUSH and REPLACE?
A2. Push will push a new history entry on top of existing entries.
Replace will replace the current history entry.

Q3. Does POP mean an entry has been deleted from browser history?
A3. No, it means back or forward movement in history.

Q4. What navigation type is reported when a user presses the browser Back button?
A4. pop

Q5. If useNavigationType() returns POP, can you conclude that the user pressed Back? Explain.
A5. Not necessarily. It could be forward button also. It returns POP when when forward and back movement takes place.

Q6. What navigation type would you expect after:
navigate("/products", { replace: true });
A6. REPLACE

Q7. Why might useNavigationType() be useful in a React dashboard?
A7. IMPORTANT: Imagine your Products page contains a long list of products.

The user scrolls down, opens a product, then presses Back.

You might want to restore their previous scroll position instead of starting at the top.

The navigation type can help you distinguish between:

- A new navigation (PUSH).
- A replacement navigation (REPLACE).
- Returning to an existing history entry (POP).
  For example:

```
import { useNavigationType } from "react-router";

const Products = () => {
  const navigationType = useNavigationType();

  return (
    <p>
      {navigationType === "POP"
        ? "Navigation to an existing history entry"
        : "New or replacement navigation"}
    </p>
  );
};
```

This doesn't restore scrolling automatically. It simply provides information you could use as part of a scroll-restoration strategy.

Also remember: POP alone doesn't tell you whether the user pressed Back or Forward, or whether this is the initial page load.

Complete the exercise and share your NavigationDetails.tsx, any changes to PageTemplate.tsx, and answers to Q1–Q7.

## NavigationDetails.tsx

```
import { useLocation, useNavigate, useNavigationType } from 'react-router';

const NavigationDetails = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  const productHandler = () => {
    navigate('/products');
  };

  const orderHandler = () => {
    navigate('/orders', { replace: true });
  };

  return (
    <div>
      <p>pathname: {location.pathname}</p>
      <p>navigationType: {navigationType}</p>
      <button onClick={productHandler}>Products</button>
      <button onClick={orderHandler}>Replace with orders</button>
    </div>
  );
};

export default NavigationDetails;
```

## PageTemplate.tsx

```
import { NavLink, Outlet } from 'react-router';
import NavigationDetails from './NavigationDetails';

const PageTemplate = () => {
  return (
    <div>
      <nav>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to='/products'
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
        >
          Products
        </NavLink>
        <NavLink
          to='/products/new'
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
        >
          Create Product
        </NavLink>
        <NavLink
          to='/orders'
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
        >
          Orders
        </NavLink>
      </nav>
      <Outlet />
      <NavigationDetails />
    </div>
  );
};

export default PageTemplate;
```
