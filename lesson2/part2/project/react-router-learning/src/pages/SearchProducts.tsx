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
