import {
  Link,
  MemoryRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const backHandler = () => {
    navigate(-1);
  };

  const forwardHandler = () => {
    navigate(1);
  };

  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/products'>Products</Link>
      <Link to='/orders'>Orders</Link>
      <Outlet />
      <p>pathname: {location.pathname}</p>
      <button onClick={backHandler}>Back</button>
      <button onClick={forwardHandler}>Forward</button>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <h1>Home page</h1>
    </>
  );
};

const Products = () => {
  return (
    <>
      <h1>Products page</h1>
    </>
  );
};

const Orders = () => {
  return (
    <>
      <h1>Orders page</h1>
    </>
  );
};

const MemoryRouterDemo = () => {
  return (
    <MemoryRouter
      initialEntries={['/', '/products', '/orders']}
      initialIndex={1}
    >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='orders' element={<Orders />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

export default MemoryRouterDemo;
