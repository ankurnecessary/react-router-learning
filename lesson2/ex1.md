Q1. What is the purpose of BrowserRouter? Why do we typically wrap our application with it?
A1. 1. BrowserRouter connects browser with react router. 2. It also makes available various utility hooks and functions available with react-router to the components wrapped inside <BrowserRouter />.

Q2. Explain the difference between Routes and Route.
A2. 1. Routes checks the pathname and availability of the pathname inside <Route/>. It provides the correct <Route/> after checking. 2. Route defines a connection between a path and a react component.

Q3. Consider:

`<Route path="/products" element={<Products />} />`

Why do we write <Products /> rather than Products in the element prop?
A3. Because it goes with the element property of the <Route />. It creates the react element.

Q4. Consider this structure:

`<BrowserRouter>
  <App />
</BrowserRouter>`

Inside App, we have a Header component containing a React Router Link.

Would that Link have access to the router context? Explain.
A4. Yes it will have access of <Link /> because <Header /> is indirectly sitting inside <BrowserRouter /> which makes <Link/> working inside <Header />.

Q5. Suppose we define:

`<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
</Routes>`

What happens when the browser's pathname is /orders?
A5. In Declarative Mode, Routes renders null when no route matches. React Router may also log a warning about the unmatched location.

We can explicitly handle unmatched URLs:

```Typescript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

Here, * acts as a wildcard.
