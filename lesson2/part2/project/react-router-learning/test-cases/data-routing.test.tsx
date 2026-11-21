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
    ).toBeInTheDocument();
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
    ).toBeInTheDocument();
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

  it("should navigate to '/products' when navigated to '/old-catalog", async () => {
    const route = renderRoute(['/old-catalog']);
    expect(
      await screen.findByRole('heading', {
        name: 'Products',
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(route.state.location.pathname).toBe('/products');
  });

  it('should navigate to 404-not found page when navigated to an unknown route', async () => {
    renderRoute(['/unknown-route']);
    expect(
      await screen.findByRole('heading', {
        name: '404 - Page not found',
        level: 1,
      }),
    ).toBeInTheDocument();
  });
});
