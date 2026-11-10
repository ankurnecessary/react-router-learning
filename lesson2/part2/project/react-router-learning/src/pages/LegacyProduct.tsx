import { Navigate } from 'react-router';

type LegacyProductProps = {
  productId?: string;
};
const LegacyProduct = ({ productId }: LegacyProductProps) => {
  // productId = '1'; // Try to toggle the commenting
  if (!productId) {
    return <Navigate to='/products' replace />;
  }
  return <div>Legacy Product: {productId}</div>;
};

export default LegacyProduct;
