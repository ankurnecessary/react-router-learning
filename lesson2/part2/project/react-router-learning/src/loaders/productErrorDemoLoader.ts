import type { LoaderFunctionArgs } from 'react-router';

export const productErrorDemoLoader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const status = Number(url.searchParams.get('status'));
  if (status === 404) {
    throw new Response('Product does not exist', {
      status,
      statusText: 'Product not found',
    });
  } else if (status === 503) {
    throw new Response('Product service not working', {
      status,
      statusText: 'Product service unavailable',
    });
  }

  throw new Error('Unexpected product error');
};
