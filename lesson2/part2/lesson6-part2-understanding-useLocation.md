Q1. What is the purpose of useLocation()?
A1. We can useLocation() to fetch route related information like pathname, searchParams and hash which can help us in implementing route aware components.

Q2. For this URL:
/products/101?sort=price&page=2#reviews


What are the values of:
location.pathname;
location.search;
location.hash;
A2. 
location.pathname; = /products/101
location.search; = ?sort=price&page=2
location.hash; = #reviews


Q3. What's the difference between location.search and useSearchParams()?
A3. location.search will fetch the whole search part of the URL i.e. location.search; = ?sort=price&page=2 but useSearchParams() helps in fetching individual values like sort and page.

Q4. Does location.search include the ? character?
A4. Yes

Q5. If React Router navigates from /products to /orders, will a component using useLocation() receive the updated location?
A5. Yes, useLocation() will always fetch the details of the current URL.

Q6. What is the general purpose of location.state, and is its value visible in the browser URL?
A6. It's general purpose is to fetch some object which has been added to route declaration. 

Complete the exercise and share your LocationDetails.tsx and answers to Q1–Q6.

LocationDetails.tsx

```
import { useLocation } from "react-router";

const LocationDetails = () => {
  const location = useLocation();
  return (
    <div>
      <p>location.pathname: {location.pathname}</p>
      <p>location.search: {location.search}</p>
      <p>location.hash: {location.hash}</p>
    </div>
  );
};

export default LocationDetails;
```
