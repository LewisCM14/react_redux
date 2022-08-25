import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch(); // stores the useDispatch method in a variable
  
  // selects the totalQuantity field for the cart via the cart key given.
  const cartQuantity = useSelector(state => state.cart.totalQuantity); // returned in button below

  /**
   * uses the dispatch variable to call the toggle method,
   * found in the reducers of the uiSlice.
   */
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
