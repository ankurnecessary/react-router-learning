Q1. What is the difference between history.pushState() and history.replaceState()?
A1. `pushState()` adds a new entry in browser history but `replaceState()` replace the existing pathname in the current browser entry with the new pathname.


Q2. Consider:

```
window.history.pushState(null, "", "/products");
```

Will this statement automatically cause React to render the Products component? Explain why.
A2. No, because `history.pushState(...)` only interacts with the browser history and adds a new entry in it. It doesn't do anything else.


Q3. Suppose the current history is:

/ → /products → /orders

The current URL is /orders.

We execute:

```Javascript
window.history.replaceState(null, "", "/categories");
```

What happens when the user presses Back?
A3. User will land on /products as `replaceState()` replaces the current browser history entry.


Q4. Does calling history.pushState() directly trigger a popstate event?
A4. No

Q5. Why is React Router useful even though browsers already provide pushState(), replaceState(), and popstate?
A5. because it helps in loading the right component(s) when there is a route change.

