import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
import { BrowserRouter, RouterProvider } from 'react-router';
import { router } from './routes/DataRouter.tsx';
// import MemoryRouterDemo from "./pages/MemoryRouterDemo.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <BrowserRouter> */}
    {/*   <App /> */}
    {/* </BrowserRouter> */}
    {/* <hr /> */}
    {/* <MemoryRouterDemo /> */}
  </StrictMode>,
);
