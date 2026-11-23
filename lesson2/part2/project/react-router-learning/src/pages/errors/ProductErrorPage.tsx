import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';

const ProductErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/products');
  };

  const backButton = <button onClick={clickHandler}>Back</button>;

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
        {backButton}
      </div>
    );
  }

  return (
    <div>
      <h1>Something went wrong!</h1>
      {backButton}
    </div>
  );
};

export default ProductErrorPage;
