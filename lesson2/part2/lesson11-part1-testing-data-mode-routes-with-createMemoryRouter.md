## Exercise

Q1. Why shouldn't we use the same createBrowserRouter instance across all integration tests?
A1. Because it uses browser environment and we don't have it easily available in test environment. So, instead we use `createMemoryRouter()`. It provides the same browser behavior for navigation without browser.

On top of that, we should not provide the same browser instance to all test cases. This will lead to unexpected router behaviour.

Q2. What is the purpose of initialEntries?
A2. initialEntries contains an array of routes resembling current entries in the browser history.

Q3. Why do we render <RouterProvider router={router} /> instead of <MemoryRouter>?
A3. <MemoryRouter /> is used and functional with declarative mode not with data mode.

Q4. What additional verification does this provide?

```
expect(router.state.location.pathname).toBe('/products/101');
```

A4. It helps in checking the current route at which the control is.

Q5. Suppose a route has a loader that takes 500 ms to complete. Why might findByRole be more appropriate than getByRole?
A5. findByRole works asynchronously. So the delay will be well handled but if we use getByRole, if will expect behavior to be synchronous and throw error.

Complete these tests and share your code and answers.

## data-routing.test.test

```
import {
  createMemoryRouter,
  RouterProvider,
  type InitialEntry,
} from 'react-router';
import { describe, expect, it } from 'vitest';
import { routes } from '../src/routes/DataRoutes';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

const renderRoute = (initialEntries: InitialEntry[]) => {
  const router = createMemoryRouter(routes, {
    initialEntries,
  });
  render(<RouterProvider router={router} />);
  return router;
};

describe("Router's data mode", () => {
  it('should load /products', async () => {
    renderRoute(['/products']);

    expect(
      await screen.findByRole('heading', {
        name: 'Products',
        level: 1,
      }),
    );
  });

  it("should use /products/101 when 'laptop' link is clicked", async () => {
    const user = userEvent.setup();
    const route = renderRoute(['/products']);

    await user.click(await screen.findByRole('link', { name: 'Laptop' }));

    expect(
      await screen.findByRole('heading', { name: 'Product Detail', level: 1 }),
    ).toBeInTheDocument();

    expect(route.state.location.pathname).toBe('/products/101');
  });

  it("'Product Edit Page' heading appears when navigate to /products/101/edit", async () => {
    renderRoute(['/products/101/edit']);
    expect(
      await screen.findByRole('heading', {
        name: 'Product Edit page',
        level: 1,
      }),
    );
  });

  it("should go back to '/products/101' when cancel button is pressed on '/products/101/edit'", async () => {
    const user = userEvent.setup();

    const route = renderRoute(['/products/101/edit']);

    await user.click(await screen.findByRole('button', { name: 'Cancel' }));

    expect(
      await screen.findByRole('heading', { name: 'Product Detail', level: 1 }),
    ).toBeInTheDocument();
    expect(route.state.location.pathname).toBe('/products/101');
  });

  it("should navigate to '/products' when navigated to '/old-catalog", () => {
    const route = renderRoute(['/old-catalog']);
    expect(route.state.location.pathname).toBe('/products');
  });

  it('should navigate to 404-not found page when navigated to an unknown route', async () => {
    renderRoute(['/unknown-route']);
    expect(
      await screen.findByRole('heading', {
        name: '404 - Page not found',
        level: 1,
      }),
    );
  });
});
```
