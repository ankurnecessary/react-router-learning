import { Link, useNavigate, useSearchParams } from 'react-router';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const products = [
    { id: 101, name: 'Laptop' },
    { id: 102, name: 'Desktop' },
    { id: 103, name: 'Keyboard' },
  ];
  const search = searchParams.get('search') ?? 'not present';
  const page = searchParams.get('page') ?? 'not present';

  const clickHandler = (productId: number) => {
    navigate(`/products/${productId}`, {
      state: { source: 'button-navigation' },
    });
  };

  const nextPageHandler = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      const newPageNumber: string =
        String(Number(newParams.get('page')) + 1) || '0';
      newParams.set('page', newPageNumber);
      return newParams;
      // Task B: Products list
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
      <p>Search params (search): {search}</p>
      <p>Search params (page): {page}</p>
      {page !== 'not present' && (
        <button onClick={nextPageHandler}>Next page</button>
      )}
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
