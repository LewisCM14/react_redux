import { uiActions } from "./ui-slice";
import { cartActions } from './cart-slice';

/**
 * custom thunk method, points to another async function immediately
 * dispatches the sending notification before attempting to send a
 * a HTTP request to firebase backend, PUT method replaces existing data
 * sends the data stored in 'cart', re-evaluates whenever cart store changes.
 * then awaits the result of sendRequest, if no error is thrown shows success notification,
 * else displays the error notification
 */

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
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
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

/**
 * a action function to fetch cart data from the backend,
 * immediately points at an async function which performs a GET request to the firebase cart node
 * checks if response returns falsy, throwing error, else returns the converted json data
 *
 * The result of fetchData is awaited in the try/catch block,
 * returning the json data in the CartData object, which is then delivered as the payload to
 * the replaceCart method in the cart-slice.js store.
 * or catches the thrown error and displays a error notification.
 */

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://cart-1bad1-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};
