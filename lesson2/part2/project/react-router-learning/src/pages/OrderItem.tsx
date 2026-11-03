import { useParams } from "react-router";

const OrderItem = () => {
  const { orderId, itemId } = useParams();
  return (
    <div>
      <p>orderId: {orderId}</p>
      <p>itemId: {itemId}</p>
    </div>
  );
};

export default OrderItem;
