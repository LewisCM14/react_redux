import { useEffect } from "react";
import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  /**
   * toggle cart on/off, bound to the Cart component
   * receives the current state and the target value to update it with
   */
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  // subscribes to to the redux store for latest cart
  const cart = useSelector((state) => state.cart);

  /**
   * sends a HTTP request to firebase backend, PUT method replaces existing data
   * sends the data stored in 'cart' above, re-evaluates whenever cart store changes.
   * logic for updating cart remains in reducer, async is done outside of it.
   */
  useEffect(() => {
    fetch("https://cart-1bad1-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart)
    });
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
