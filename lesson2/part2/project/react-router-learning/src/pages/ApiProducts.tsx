import { useLoaderData, useSearchParams } from 'react-router';
import type ProductLoader from '../loaders/productsLoader';

const ApiProducts = () => {
  const data = useLoaderData<typeof ProductLoader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const limit = 10;

  const nextClickHandler = () => {
    const nextPage = page + 1;
    setSearchParams((prev) => {
      prev.set('page', nextPage.toString());
      return prev;
    });
  };

  const previousClickHandler = () => {
    const previousPage = page - 1;
    setSearchParams((prev) => {
      prev.set('page', previousPage.toString());
      return prev;
    });
  };

  const isNextButtonDisabled = (
    totalRecords: number,
    currentPage: number,
    noOfRecords: number,
  ): boolean => {
    const totalPages = Math.ceil(totalRecords / noOfRecords);
    return currentPage >= totalPages;
  };

  return (
    <>
      <h1>API Products</h1>
      <button disabled={page <= 1} onClick={previousClickHandler}>
        Previous
      </button>
      <span style={{ padding: '20px' }}>Page {page}</span>
      <button
        disabled={isNextButtonDisabled(data.total, page, limit)}
        onClick={nextClickHandler}
      >
        Next
      </button>
      <ul>
        {data.products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </>
  );
};

export default ApiProducts;
