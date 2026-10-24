Q1. What is the primary difference between traditional full-page navigation and React SPA navigation?

A1. Full page navigation loads full page again and again but React SPA navigation loads only a part of the page ,probably, using HTTP requests.


Q2. In a React SPA, clicking a React Router Link from / to /products normally loads a completely new HTML document. True or false? Explain.

A2. False. It will load a page partially. It may send HTTP requests to server for that partial rendering but it will not be completely new HTML document.


Q3. Suppose your React dashboard uses React Router and React Query. You click the Products link, and the Products component makes an API request.

Does this mean the application performed a full-page navigation? Why or why not?

A3. No, it doesn't mean full-page navigation because React Router is loading only a part of the page which again asks for some data from the server which will refresh a part of the page component.


Q4. You are on /products in a React SPA and press F5. Does React Router prevent the browser from making a new document request?

A4. No, it will not. It will reload the whole HTML document as per the route /products.


Q5. Consider these two navigation elements:
<a href="/orders">Orders</a>


<Link to="/orders">Orders</Link>


What difference would you expect between them in a typical React Router application?

A5. <a> - full page refresh
<Link> - partial page refresh/rendering
