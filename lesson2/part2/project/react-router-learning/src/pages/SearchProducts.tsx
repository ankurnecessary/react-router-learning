import { useSearchParams } from "react-router";

const SearchProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const page = searchParams.get("page") ?? "1";

  const clickHandler = () => {
    setSearchParams({ page: "2" });
  };

  const nextPageHandler = () => {
    // /search-products?search=laptop&page=3&sort=price -> /search-products?search=laptop&page=4&sort=price
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const currentPage = Number(next.get("page")) ?? 1;
      next.set("page", String(currentPage + 1));
      return next;
    });
  };

  const clearSearchHandler = () => {
    // /search-products?search=laptop&page=3&sort=price -> /search-products?page=3&sort=price
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("search");
      return next;
    });
  };

  const searchKeyboardHandler = () => {
    // /search-products?search=laptop&page=3&sort=price -> /search-products?search=keyboard&page=1&sort=price
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("search", "keyboard");
      next.set("page", "1");
      return next;
    });
  };

  // /search-products?search=laptop&page=3&sort=price

  return (
    <div>
      <h1>Search Products</h1>
      <p>Search: {search}</p>
      <p>Page: {page}</p>
      <button onClick={clickHandler}>Go to Page 2</button>
      <button onClick={nextPageHandler}>Next Page</button>
      <button onClick={clearSearchHandler}>Clear Search</button>
      <button onClick={searchKeyboardHandler}>Search Keyboard</button>
    </div>
  );
};

export default SearchProducts;
