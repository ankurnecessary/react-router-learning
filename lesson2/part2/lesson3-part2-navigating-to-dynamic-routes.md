Q1. Suppose:
const product = { id: "500", name: "Monitor" };

What URL does this generate?
<Link to={`/products/${product.id}`}>
  {product.name}
</Link>
A1. /products/500

Q2. Why is this incorrect for navigating to a specific product?
<Link to="/products/:productId">
  View Product
</Link>
A2. :productId is used while declaring a route not while using it. :productId doesn't resemble anything inside <Link />.

Q3. What is the purpose of React Router's generatePath() function?
A3. generatePath() is used as an alternative to write paths using template literals. It is just used to define paths explicitly. It makes parameter substitution explicit.

```
generatePath("/products/:productId", {
  productId: "500",
});
```

It returns /products/500.

It doesn't verify that the generated URL matches one of your configured routes.

Q4. Suppose your product ID is "abc". Does React Router allow navigation to /products/abc? What determines whether that product is valid?
A4. Yes /products/abc will work as a route and load ProductDetail component but to determine whether the product is valid, we have to validate it on the backend server and show the response accordingly.

Q5. Why should we provide a key when rendering a list of product links with .map()? Is this a React Router requirement or a React requirement?
A5. It is a React requirement. It is needed to map the array items with their corresponding DOM item. So that in future, if there is any change in an array item then it will help diffing algorithm to make changes in DOM precisely.

Complete the exercise and share your updated Products.tsx, along with answers to Q1–Q5.

Product.tsx

```
import { Link } from "react-router";

const Products = () => {
  const products = [
    { id: 101, name: "Laptop" },
    { id: 102, name: "Desktop" },
    { id: 103, name: "Keyboard" },
  ];
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
```
