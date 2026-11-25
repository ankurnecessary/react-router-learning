import type { LoaderFunctionArgs } from 'react-router';
import type { ProductsResponse } from '../types/product';

const productsLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<ProductsResponse> => {
  const response = await fetch('https://dummyjson.com/products?limit=10', {
    signal: request.signal,
  });

  if (!response.ok) {
    throw new Response('Cannot fetch products', {
      status: response.status,
      statusText: response.statusText,
    });
  }

  return response.json();
};

export default productsLoader;
