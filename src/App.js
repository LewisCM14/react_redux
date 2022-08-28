import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch(); // stores the dispatch method in a function
  /**
   * toggle cart on/off, bound to the Cart component
   * receives the current state and the target value to update it with
   */
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  // subscribes to to the redux store for latest cart
  const cart = useSelector((state) => state.cart);

  // collects the notification state from ui-slice, defaults to null
  const notification = useSelector((state) => state.ui.notification);

  // calls the fetchCartData function found in cart-actions.js, this returns a 'cart' object
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // determines if page has undergone initial render or not.
  // then uses the 'changed' field in cart-slice to determine if the front & back end cart data match
  // if no match, calls the sendCartData function in cart-slice.js, passing it the new cart object.
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  /**
   * Notification component renders dependant upon the useEffect method above
   */
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
