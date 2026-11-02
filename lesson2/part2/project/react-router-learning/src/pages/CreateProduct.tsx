import { useNavigate } from "react-router";

const CreateProduct = () => {
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("/products", { replace: true });
  };
  const saveHandler = () => {
    navigate("/products");
  };

  return (
    <div>
      <h1>Create Product</h1>
      <button onClick={cancelHandler}>Cancel</button>
      <button onClick={saveHandler}>Save Product</button>
    </div>
  );
};

export default CreateProduct;
