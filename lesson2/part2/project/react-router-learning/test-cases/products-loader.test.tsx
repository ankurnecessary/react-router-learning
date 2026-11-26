import {
  createMemoryRouter,
  RouterProvider,
  type InitialEntry,
} from 'react-router';
import { describe, expect, it } from 'vitest';
import { routes } from '../src/routes/DataRoutes';
import { render, screen } from '@testing-library/react';

const renderRoute = (initialEntries: InitialEntry[]) => {
  const router = createMemoryRouter(routes, { initialEntries });
  render(<RouterProvider router={router} />);
  return router;
};

describe('ApiProducts', () => {
  it("should load products' list via /products/api-products?page=1", async () => {
    renderRoute(['/products/api-products?page=1']);
    expect(
      await screen.findByText('Essence Mascara Lash Princess'),
    ).toBeInTheDocument();
  });
});
