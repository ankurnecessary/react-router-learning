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
  it('clicking a product opens its details page', async () => {
    const user = userEvent.setup();

    renderRoute(['/products']);

    await user.click(screen.getByRole('link', { name: 'Laptop' }));

    expect(
      await screen.findByRole('heading', {
        name: 'Product Detail',
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('101')).toBeInTheDocument();
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
    expect(
      screen.getByRole('heading', { name: 'Product Detail', level: 1 }),
    ).toBeInTheDocument();
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
    ).toBeInTheDocument();
  });

  it('/old-products redirects to /products using <Navigate replace />', async () => {
    renderRoute(['/old-products']);
    expect(
      await screen.findByRole('heading', { name: 'Products' }),
    ).toBeInTheDocument();
  });
});
