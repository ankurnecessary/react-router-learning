Q1. Does files/:fileId match /files/documents/reports? Explain.
A1. No, because files/:fileId matches 2 route segments. But in case of /files/documents/reports we have 3 route segments. So, it will not match.

Q2. For the route:
<Route path="files/*" element={<FileViewer />} />

What is params[`*`] for /files/documents/reports/2026.pdf?
A2. documents/reports/2026.pdf

Q3. Does files/* match /files? If so, what is the splat value?
A3. Yes it will match `files/*`. Here splat value will be "".

Q4. Suppose you define:
<Route path="products/:productId" element={<ProductDetails />} />
<Route path="products/*" element={<Fallback />} />

Which component renders for /products/45? Why?
A4. Because of route ranking mechanism /products/45 will be controlled by <Route path="products/:productId" element={<ProductDetails />} />

Q5. Why is a route such as products/:productId generally more appropriate than products/* for displaying a single product?
A5. Because single product has a single id and we use a route like products/12 to depict a product's route. In such cases, a specific route definition like products/:productId makes more sense where we can catch a route parameter productId much easily and in predictable way in comparison to `products/*`.

Complete the exercise and answer Q1–Q5. Share your FileViewer.tsx implementation.

FileViewer.tsx

import { useParams } from "react-router";

const FileViewer = () => {
  const { "*": filePath } = useParams();
  return <div>{filePath}</div>;
};

export default FileViewer;
