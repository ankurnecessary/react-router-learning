Q1. Why does setSearchParams({ page: "2" }) remove the other search parameters?
A1. Because setSearchParams({...}) sets whole searh parameter part of the URL.

Q2. What is the purpose of creating new URLSearchParams(prev) inside the callback?
A2. It creates a new copy of the existing search parameters. This will help in creating new set of search parameters. In this way we will not change the value of existing search parameters.

Q3. What is the difference between .set("search", "") and .delete("search")?
A3. .set("search", "") - ?search=&page=1 
.delete("search") - ?page=1

Q4. If the current URL is:
/products?search=laptop&page=5&sort=price

what will the URL contain after:

```
setSearchParams((prev) => {
  const next = new URLSearchParams(prev);
  next.set("page", "6");
  return next;
});
```
A4. 
/products?search=laptop&page=6&sort=price

Q5. Why should pagination generally reset to page 1 when the user changes a search filter?
A5. Because this is a valid user experience for search. A user will not expect to start a new search from page 4 or other.

Complete the exercise and share your updated SearchProducts.tsx and answers to Q1–Q5.

SearchProducts.tsx

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
      const nextPage = Number(page) + 1;
      next.set("page", nextPage.toString());
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
