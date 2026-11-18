import { useNavigate, useParams } from 'react-router';

const ProductEdit = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('..', { relative: 'path' });
  };
  return (
    <>
      <h1>Product Edit page</h1>
      <p>{productId}</p>
      <button onClick={clickHandler}>Cancel</button>
    </>
  );
};

export default ProductEdit;
