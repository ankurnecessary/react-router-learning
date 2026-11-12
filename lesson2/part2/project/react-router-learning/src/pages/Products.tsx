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
