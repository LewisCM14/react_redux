import { useDispatch } from "react-redux";

import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const dispatch = useDispatch(); // stores the useDispatch method in a variable
  const { title, quantity, total, price, id } = props.item;

  /**
   * uses the dispatch variable to call the removeItemFromCart method,
   * found in the reducers of the cartSlice. Passes id as the payload.
   * bound to the onClick event of the minus button below.
   */
  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  /**
   * uses the dispatch variable to call the addItemFromCart method,
   * found in the reducers of the cartSlice. Passes id, title and price as payload.
   * bound to the onClick event of the plus button below.
   */
  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
