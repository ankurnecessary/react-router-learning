import { useParams } from "react-router";

const ProductDetails = () => {
  const { productId } = useParams();
  return (
    <div>
      <h1>Product Detail</h1>
      <p>{productId}</p>
    </div>
  );
};

export default ProductDetails;
