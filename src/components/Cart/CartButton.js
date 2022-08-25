import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';


const CartButton = (props) => {
    const dispatch = useDispatch(); // stores the useDispatch method in a variable
    
    /**
     * uses the dispatch variable to call the toggle method,
     * found in the reducers of the uiSlice.
     */
    const toggleCartHandler = () =>{
        dispatch(uiActions.toggle());
    };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
