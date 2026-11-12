Q. Why should we use navigation state?
A. Imagine a Products page containing a list of products.

A user clicks a product:
Products List → Product Details

On the Product Details page, you want to know where the user came from.

For example:

- Products list
- Search results
- Featured products
  You could put this information in the URL:
  /products/101?source=search-results

But sometimes this information is temporary and only relevant to the current navigation.

Example: Suppose we have datatable on product listing and we are currently @ /products?page=5. We clicked edit link on page 5 and we want that we should land back on page 5 after saving edits. In this scenario we can use `navigation state`

That's where navigation state becomes useful.

Q1. What is navigation state in React Router?
A1. Navigation state is the information that we pass from the source route to destination route while navigating between them.

Q2. How do you pass navigation state using <Link />?
A2. `<Link to='/products/101' state={{source: 'product-list'}}>...</Link>`

Q3. How do you access navigation state in the destination component?
A3. We do it using `useLocation()` function. `const {state} = useLocation()`. Now `state` has the state object.

Q4. What is the difference between a route parameter and navigation state?
A4. /products/:productId - Here productId is the route parameter. But we don't incorporate navigation state in URL. It stays hidden. When we ctrl + click a `<Link />` route parameter gets passed to the new tab but not navigation state.

Q5. Suppose a user directly opens /products/101 in a new tab. What should your component expect for location.state?
A5. null

Q6. Is navigation state suitable for storing passwords or authentication tokens? Why or why not?
A6. No, it is not because it can be explored in debugger in browser.

Q7. What is the difference between passing state through <Link /> and passing it through useNavigate()?
A7. Difference is only related to the syntax.

```
<Link state={...} />
// OR
const navigate = useNavigate();
navigate('/products/101', {
    state: "page"
})
```

Complete the exercise and share your updated Products.tsx, ProductDetails.tsx, and answers to Q1–Q7.

Products.tsx

```
import { Link, useNavigate } from 'react-router';

const Products = () => {
  const navigate = useNavigate();
  const products = [
    { id: 101, name: 'Laptop' },
    { id: 102, name: 'Desktop' },
    { id: 103, name: 'Keyboard' },
  ];
  const clickHandler = (productId: number) => {
    navigate(`/products/${productId}`, {
      state: { source: 'button-navigation' },
    });
  };
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link
              to={`/products/${product.id}`}
              state={{ source: 'product-list' }}
            >
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          clickHandler(102);
        }}
      >
        Go to Desktop
      </button>
    </div>
  );
};

export default Products;
```

ProductDetails.tsx

```
import { Link, useLocation, useParams } from 'react-router';

type ProductNavigationState = {
  source: string;
};

const ProductDetails = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const navigationState = state as ProductNavigationState | null;
  return (
    <div>
      <h1>Product Detail</h1>
      <p>{productId}</p>
      <p>Source: {navigationState?.source ?? 'Direct visit'}</p>
      <Link to='..'>Back to products</Link>
    </div>
  );
};

export default ProductDetails;
```
