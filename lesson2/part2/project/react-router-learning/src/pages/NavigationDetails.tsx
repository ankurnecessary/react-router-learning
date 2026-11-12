import { useLocation, useNavigate, useNavigationType } from 'react-router';

const NavigationDetails = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  const productHandler = () => {
    navigate('/products');
  };

  const orderHandler = () => {
    navigate('/orders', { replace: true });
  };

  return (
    <div>
      <p>pathname: {location.pathname}</p>
      <p>navigationType: {navigationType}</p>
      <button onClick={productHandler}>Products</button>
      <button onClick={orderHandler}>Replace with orders</button>
    </div>
  );
};

export default NavigationDetails;
