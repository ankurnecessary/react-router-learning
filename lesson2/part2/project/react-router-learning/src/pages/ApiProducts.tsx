import { useLoaderData } from 'react-router';
import type { ProductsResponse } from '../types/product';

const ApiProducts = () => {
  const data: ProductsResponse = useLoaderData();
  return (
    <div>
      <ul>
        {data.products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiProducts;
