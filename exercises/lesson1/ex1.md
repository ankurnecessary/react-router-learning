
Q1. What does routing mean in a React application?

A1. Routing means mapping a component with the route. Like /orders will open orders page, /products will open products page etc.


Q2. Consider this URL:
http://localhost:5173/products/45?sort=price
What would window.location.pathname return?

A2: /products/45


Q3. Suppose our application uses this logic:

``` Typescript
const path = window.location.pathname;

if (path === "/products") {
  return <Products />;
}

return <NotFound />;
```

A user directly opens:
http://localhost:5173/products/45


Which component will be rendered, and why?

A3. It will render `<NotFound />` because '/products/45' !== '/products'.


Q4. Why might manually checking window.location.pathname become difficult as an e-commerce application grows? Give at least two reasons.

A4. 1. When the no. of product grows, it will become difficult to  handle all the routes in if condition with separate id.
2. This solution will not work with history API


Q5. Does React Router replace React components, or does it help determine which React components should be rendered?

A5. It helps in determining the component that should be rendered.
