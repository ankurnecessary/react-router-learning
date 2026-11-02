Assume:
```typescript

<Routes>
  <Route path="/" element={<PageTemplate />}>
    <Route index element={<Home />} />

    <Route path="products" element={<ProductsLayout />}>
      <Route index element={<Products />} />
      <Route path="new" element={<CreateProduct />} />
      <Route path=":productId/edit" element={<EditProduct />} />
    </Route>
  </Route>
</Routes>
```


And assume ProductsLayout contains an <Outlet />.

Answer the following questions.

Q1. You're inside CreateProduct at /products/new. What is the destination of:
navigate("..");
A1. /products

Q2. You're inside EditProduct at /products/45/edit. What is the destination of:
navigate("..");
A2. /products

Q3. From the same EditProduct route, what is the destination of:
navigate("..", { relative: "path" });
A3. /products/45

Q4. What is the advantage of route-relative navigation when you reorganize a route hierarchy?
A4. The actual advantage of route-relative navigation is that it expresses navigation in terms of the route hierarchy rather than hardcoded URL segments.

For example, if a parent route changes from /products to /catalog/products, correctly nested child components using navigate("..") can continue navigating to their parent without changing that navigation code.

Q5. Suppose you navigate from /products/45/edit using:
navigate("/orders");

Does the current route hierarchy affect the destination? Explain.
A5. No, as we are passing "/orders" to navigate(...), it will lead us to http://domain.com/orders. This is not relative to the path or route hierarchy. It is an absolute path.
