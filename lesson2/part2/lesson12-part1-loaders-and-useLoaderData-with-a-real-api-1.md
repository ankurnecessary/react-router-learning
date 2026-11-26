# Exercise

Q1. Why does changing search parameters through setSearchParams() trigger the loader again even though the route pathname hasn't changed?

A1. Because it does not only react to change of pathname but to change in searchParams too.

Q2. Do you need a separate useEffect to fetch products when the page number changes? Why?

A2. No because route loader function are sensitive to searchParams change too. So making loader function reactive for searchParams and adding mechanism to change the searchParams from the component help.

Q3. What advantage does useLoaderData<typeof productsLoader>() provide over independently declaring the response type in the component?

A3. This way of using type makes our code sensitive to future changes in the loader and checks it's usage in the component.

Q4. Why do we use productRoutes directly but ...orderRoutes with the spread operator?

A4. Because we need the whole route object exported by productRoutes in main route but in case of orderRoutes we need only objects inside it's array in main route.

Q5. Why is separating createBrowserRouter() from the route configuration beneficial for integration testing?

A5. Then it will not unnecessarily create a browser router while running the test cases.
