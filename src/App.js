import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

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

  /**
   * sends a HTTP request to firebase backend, PUT method replaces existing data
   * sends the data stored in 'cart' above, re-evaluates whenever cart store changes.
   * logic for updating cart remains in reducer, async is done outside of it.
   *
   * uses the dispatch method from redux to trigger the Notification.js component where required.
   */
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "https://cart-1bad1-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
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
