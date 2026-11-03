Q1. Consider:
<Route path="products/:productId" element={<ProductDetails />} />

Does this route match /products/45? What about /products/abc?
A1. Yes it will match both 45 and abc because it matches route definition. 

And it is not like, we should keep this dynamic route declaration below any other /products' specific static routes like <Route path="products/create" element={<CreateProduct />} />. We can keep /products/:productId before /products/create while declaring routes. So basically the code below will work fine. 

```
<Routes>
  <Route path="products/:productId" element={<ProductDetails />} />
  <Route path="products/create" element={<CreateProduct />} />
</Routes>
```

When the browser visits /products/create, React Router selects the static route products/create, even though the dynamic route appears first.

Q2. If the browser URL is /products/150, what is the value and JavaScript type of productId returned by useParams()?
A2. productId = '150' of type string. Values fetched using useParams() are always string.

Q3. Consider:
<Route path="orders/:orderId/items/:itemId" element={<OrderItem />} />

For /orders/500/items/12, what object will useParams() return?
A3. {orderId: '500', itemId: '12'}

Q4. Does /products/:productId match /products/ ? Explain.
A4. /products/:productId doesn't match /products/.

Q5. If /products/999999 matches your route, does that prove product 999999 exists in your database?
A5. No, it doesn't mean that the this productId is present in the database. We need to add extra check while fetcing the data and at server side to handle such situations.

Complete the exercise and answer these five questions. Share your ProductDetails.tsx and updated route definition.
