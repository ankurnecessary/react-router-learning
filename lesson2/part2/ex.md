# Exercises

## Exercise 1

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

## Exercise 2

Task A: Add the NotFound component and wildcard route to your project. Verify that /unknown displays your 404 message.

Task B: Answer these three questions.

Q1. Can the following component perform client-side navigation?
```typescript 
<Link to="/orders" className="menu-link">
  Orders
</Link>
```
A1. Yes, on click of it we can reach to route /orders

Q2. Suppose the current URL is /products/45.

Will the following link have isActive === true?
```typescript

<NavLink to="/products">
  Products
</NavLink>
```
A2. Yes, because we are not using `end` attribute.

Q3. Suppose the current URL is /products/45.

Will this link have isActive === true?
```typescript
<NavLink to="/products" end>
  Products
</NavLink>
```
A3. No, again because of `end`. With `end` attribute comparison of the pathname will be with exact `to` attribute.


Also, share your navigation menu component when you reply. I want to review how you've implemented NavLink before we proceed to programmatic navigation with useNavigate.
