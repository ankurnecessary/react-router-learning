import { useLoaderData } from 'react-router';
import type ProductLoader from '../loaders/productsLoader';

const ApiProducts = () => {
  const data = useLoaderData<typeof ProductLoader>();
  return (
    <>
      <h1>API Products</h1>
      <ul>
        {data.products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </>
  );
};

export default ApiProducts;
