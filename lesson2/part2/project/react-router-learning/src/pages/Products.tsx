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
