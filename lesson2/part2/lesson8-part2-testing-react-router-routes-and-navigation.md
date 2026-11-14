## Exercise

Q1. Why is MemoryRouter useful for testing React Router components?
A1. MemoryRouter works in memory and doesn't need anything specific to browser and while running the tests we don't have browser environment. Thats why it suits in test cases.

Q2. What does initialEntries={["/products/101"]} do in a test?
A2. It creates the history entries in MemoryRouter. Since here we have only on entry, it will render this route only. Now we can test this route.

Q3. Why might testing a real <Link /> with userEvent.click() be preferable to mocking useNavigate()?
A3. Becasue we are reproducing the actual user behaviour by doing that instead of testing implementation.

Q4. What would you assert to verify that /products/:productId correctly extracts productId = "101"?
A4. Since we are printing 101 route parameter we can check its existance in the DOM.

Q5. Why might findByRole() be useful when testing a redirect implemented using <Navigate />?
A5. It works asynchronously and wait for a matching element to appear, retrying until it succeeds or times out.

Q6. Should every React Router component have its own dedicated integration test? Explain your reasoning.
A6. More tests can increase confidence, but testing every component individually is not necessarily useful.

Imagine your application has:
PageTemplate
├── Header
├── Navigation
├── ProductsLayout
│ ├── Products
│ └── ProductDetails
└── Footer

You don't need a separate routing integration test for each component.

Instead, focus on meaningful routing behaviours:

- A link navigates to the expected page.
- Route parameters reach the correct component.
- Nested routes render through their layouts.
- Unknown URLs render NotFound.
- Redirects reach the correct destination.
  For example, your test:
  it('Clicking a link from Home navigates to Products', async () => {
  // ...
  });

already exercises several components and behaviours together.

Writing separate integration tests for every component involved would likely duplicate coverage.

Better principle: Test important behaviours and failure scenarios, not every component simply because it exists.

Complete the exercise and share your Routing.test.tsx and answers to Q1–Q6.

## Routing.test.tsx

```
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
```
