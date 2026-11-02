import { useParams } from "react-router";

const ProductDetails = () => {
  const params = useParams();
  return (
    <div>
      <h1>Product Detail</h1>
      <p>{params.productId}</p>
    </div>
  );
};

export default ProductDetails;
