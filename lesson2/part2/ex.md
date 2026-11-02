Q1. Why did you place BrowserRouter in main.tsx rather than inside each page component?
A1. Because BrowserRouter is needed at application level. BrowserRouter helps in interaction between the browser's history API and react-router.

Q2. What happens if you replace NavLink with Link in your navigation menu? Does navigation still work?
A2. Navigation will not stop working. However, we need to stop using `end` and `isActive` while using `<Link />`.

Q3. What is the purpose of the isActive argument in NavLink's className callback?
A3. isActive is true when the pathname of the browser window is same as the <NavLink /> it is used on. This is true when `end` attribute is used in `<NavLink />`. If end is not used with `<NavLink to="/products" />` then this link will be highlighted even for /products, /products/123, /products/123/edit etc.

Q4. If you navigate from /products to /orders, does the browser reload the HTML document?
A4. No

Q5. What happens if you manually enter /unknown in the address bar and press Enter? Explain what you observe.
A5. For http://localhost:5173/unknown I receive a blank white page on browser. It is so because we don't have any route configured for /unknown. In DOM <div id=root /> is empty. 
