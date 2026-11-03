Q1. For this route:
<Route
path="orders/:orderId/items/:itemId"
element={<OrderItem />}
/>

What does useParams() return for /orders/700/items/25?
A1. {orderId: '700', itemId: '25'}

Q2. Does the following route match /products?
<Route
path="products/:productId?"
element={<ProductPage />}
/>

If yes, what is the value of productId?
A2. Undefined when /products is called and 123 when /products/123 is called.

Q3. What is the difference between :productId and :productId??
A3. :productId means passing productId is mandatory for this route definition but not in case of :productId?.

Q4. Does products/:productId? match /products/45/edit? Why or why not?
A4. No, it doesn't because , I think, react router will count /edit as the next segment of the route which is not present with products/:productId?.

Q5. Suppose you have:
<Route path="products" element={<Products />} />
<Route path="products/:productId?" element={<ProductPage />} />

Both patterns can match /products. Why might this configuration be confusing or undesirable?
A5. It is confusing because we are handling route /products via 2 route definitions. This will confuse a developer that where is /products is implemented.

Complete the exercise and share your OrderItem.tsx and answers.

OrderItem.tsx
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
