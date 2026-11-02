Q1. What is the difference between navigating using <Link to="/products" /> and calling navigate("/products")?
A1. <Link .../> creates a link on the page which is visible on the page but navigate("/someRoute") is used to programatically navigate to any route in the application.

Q2. What does useNavigate() return?
A2. useNavigate() returns a function which helps in navigating to other routes by pushing a new or replacing an existing history entry.

Q3. Consider:
navigate("/orders", { replace: true });

What does { replace: true } do?
A3. It replaces the current history entry with /orders.

Q4. Suppose the browser history is:
/ → /products → /products/new

The current URL is /products/new.

You execute:
navigate("/orders", { replace: true });

What URL will the user reach if they press Back?
A4. /products

Q5. Why might you prefer navigate("/products") over navigate(-1) for a Cancel button?
A5. Because with navigate(-1) there is no guarantee that user will stay inside the application. If he is on the very first page of the application and from there navigate(-1) is used then it will take a user to the page that was opened before the first page of the application.
