/search-products
/search-products?search=laptop&page=3
/search-products?search=keyboard

Q1. What is the difference between useParams() and useSearchParams()?
A1. useParams() is used to work with route parameters like /products/:id -> products/101
useSearchParams() is used to work with search parameters like /search-products?search=laptop&page=2

Q2. For the URL:
/products?search=keyboard&page=3

What are the values of:
searchParams.get("search");
searchParams.get("page");
searchParams.get("sort");
A2. 
searchParams.get("search"); - keyboard
searchParams.get("page"); - '3'
searchParams.get("sort"); - null

Q3. Does searchParams.get("page") return a number or a string?
A3. String

Q4. What happens to the URL when you call:
setSearchParams({ page: "2" });

while the current URL is:
/products?search=laptop&page=1
A4. 
/products?page=2

Q5. Why might search parameters be preferable to local React state for product filters and pagination?
A5. Don't know

Complete the exercise and share your SearchProducts.tsx and answers to Q1–Q5.

SearchProducts.tsx

import { useSearchParams } from "react-router";

const SearchProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const page = searchParams.get("page") ?? "1";
  const clickHandler = () => {
    setSearchParams({ page: "2" });
  };

  return (
    <div>
      <h1>Search Products</h1>
      <p>Search: {search}</p>
      <p>Page: {page}</p>
      <button onClick={clickHandler}>Go to Page 2</button>
    </div>
  );
};

export default SearchProducts;
