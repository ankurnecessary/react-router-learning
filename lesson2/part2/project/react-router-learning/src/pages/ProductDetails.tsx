import { Link, useParams } from "react-router";

const ProductDetails = () => {
  const { productId } = useParams();
  return (
    <div>
      <h1>Product Detail</h1>
      <p>{productId}</p>
      <Link to="..">Back to products</Link>
    </div>
  );
};

export default ProductDetails;
