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
  const router = createMemoryRouter(routes, { initialEntries });
  render(<RouterProvider router={router} />);
  return router;
};

describe('ProductErrorDemo.tsx', () => {
  it("should show message '404 Product not found' when status is 404", async () => {
    const user = userEvent.setup();
    const router = renderRoute(['/products/error-demo?status=404']);
    expect(
      await screen.findByRole('heading', {
        name: '404 Product not found',
        level: 1,
      }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /back/i }));
    expect(
      await screen.findByRole('heading', { name: 'Products', level: 1 }),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/products');
  });

  it("should show message '503 Product service unavailable' when status is 503", async () => {
    renderRoute(['/products/error-demo?status=503']);
    expect(
      await screen.findByRole('heading', {
        name: '503 Product service unavailable',
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("should show message 'Something went wrong!' when status is other than 404 and 503", async () => {
    const user = userEvent.setup();
    const router = renderRoute(['/products/error-demo?status=599']);
    expect(
      await screen.findByRole('heading', {
        name: 'Something went wrong!',
        level: 1,
      }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(await screen.findByRole('heading', { name: 'Products', level: 1 }));
    expect(router.state.location.pathname).toBe('/products');
  });

  it('should render /products/101 perfectly after all the changes', async () => {
    const routes = renderRoute(['/products/101']);
    expect(
      await screen.findByRole('heading', { name: 'Product Detail', level: 1 }),
    ).toBeInTheDocument();
    expect(routes.state.location.pathname).toBe('/products/101');
  });

  it("should show message 'Something went wrong!' when /products/render-error-demo is rendered", async () => {
    renderRoute(['/products/render-error-demo']);
    expect(
      await screen.findByRole('heading', {
        name: 'Something went wrong!',
        level: 1,
      }),
    ).toBeInTheDocument();
  });
});
