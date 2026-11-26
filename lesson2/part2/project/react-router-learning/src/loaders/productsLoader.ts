import type { LoaderFunctionArgs } from 'react-router';
import type { ProductsResponse } from '../types/product';

const productsLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<ProductsResponse> => {
  const limit = 10;

  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') ?? '1');
  const skip = (page - 1) * limit;

  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    {
      signal: request.signal,
    },
  );

  if (!response.ok) {
    throw new Response('Cannot fetch products', {
      status: response.status,
      statusText: response.statusText,
    });
  }

  return response.json();
};

export default productsLoader;
