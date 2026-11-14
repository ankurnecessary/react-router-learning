import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../src/App.tsx';

describe('Routing', () => {
  it('/products renders the Products page', () => {
    const app = (
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );
    render(app);
    expect(
      screen.getByRole('heading', { name: 'Products' }),
    ).toBeInTheDocument();
  });

  it('Clicking a link from Home navigates to Products', async () => {
    const user = userEvent.setup();
    const app = (
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    render(app);
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Products' }));
    expect(
      screen.getByRole('heading', { name: 'Products' }),
    ).toBeInTheDocument();
  });

  it('/products/101 displays product ID 101', () => {
    const app = (
      <MemoryRouter initialEntries={['/products/101']}>
        <App />
      </MemoryRouter>
    );
    render(app);
    expect(screen.getByText('101')).toBeInTheDocument();
  });

  it('/unknown-route renders NotFound', () => {
    const app = (
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );
    render(app);
    expect(
      screen.getByRole('heading', { name: '404 - Page not found' }),
    ).toBeInTheDocument();
  });

  it('/old-products redirects to /products using <Navigate replace />', async () => {
    const app = (
      <MemoryRouter initialEntries={['/old-products']}>
        <App />
      </MemoryRouter>
    );
    render(app);
    expect(
      await screen.findByRole('heading', { name: 'Products' }),
    ).toBeInTheDocument();
  });
});
