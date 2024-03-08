import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import Protected from "./features/auth/components/Protected";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/AuthSlice";
import { fetchItemByUserIdAsync } from "./features/cart/CartSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      // <Protected>
      <OrderSuccessPage></OrderSuccessPage>
      //</Protected>
    ),
  },
  {
    path: "/*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  console.log("I am here again 1");
  console.log(user);

  useEffect(() => {
    if (user) {
      console.log("I am here again 2");
      dispatch(fetchItemByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
