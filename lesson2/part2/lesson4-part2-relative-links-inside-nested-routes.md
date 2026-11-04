Q1. Given your current route hierarchy, where does this link navigate from ProductDetails at /products/101?
<Link to="..">Back</Link>
A1. /products -> <Products />

Q2. Where does this link navigate from the same component?
<Link to="../..">Back</Link>
A2. / -> <Home />

Q3. Suppose EditProduct is defined as a direct child of ProductsLayout:

```
<Route path="products" element={<ProductsLayout />}>
  <Route path=":productId/edit" element={<EditProduct />} />
</Route>
```

Inside EditProduct, where does <Link to="..">Back</Link> navigate?
A3. /products

Q4. What's the difference between <Link to=".."> and <Link to=".." relative="path">?
A4. <Link to=".." /> will work on the basis of route definition hierarchy but <Link to=".." relative="path" /> works on the basis of URL. So if we are currently on /products/123/edit and we have a relative="path" link there then, irrespective of route hierarchy, upon it's click we will reach to /products/123.

Q5. Why might route-relative links be useful when restructuring your application's routes?
A5. Because later down the line if we add more parents just above the immediate parent of the <Route /> then also it will go to the immediate parent and not to any unknown route. We won't need to make much changes in our code in this case.

Complete the exercise and answer Q1–Q5. Share your updated ProductDetails.tsx as well.

ProductDetails.tsx
import { Link, useParams } from "react-router";

const ProductDetails = () => {
  const { productId } = useParams();
  return (
    <div>
      <h1>Product Detail</h1>
      <p>{productId}</p>
      <Link to="..">Back to products</Link>
    </div>
  );
};

export default ProductDetails;
