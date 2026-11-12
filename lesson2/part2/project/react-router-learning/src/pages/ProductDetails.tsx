import { Link, useLocation, useParams } from 'react-router';

type ProductNavigationState = {
  source: string;
};

const ProductDetails = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const navigationState = state as ProductNavigationState | null;
  return (
    <div>
      <h1>Product Detail</h1>
      <p>{productId}</p>
      <p>Source: {navigationState?.source ?? 'Direct visit'}</p>
      <Link to='..'>Back to products</Link>
    </div>
  );
};

export default ProductDetails;
