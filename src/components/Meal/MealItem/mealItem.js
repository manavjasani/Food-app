import classes from "./mealItem.module.css";
import MealItemForm from "./mealItemForm";
import CartContext from "../../../store/cart-context";
import { useContext } from "react";

const MealItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;

    const cartCtx = useContext(CartContext);

    const addToCart = (amount) => {
        cartCtx.addItem({
            id: props.id,
            amount: amount,
            price: props.price,
            name: props.name
        })
    }
    
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCart} />
            </div>
        </li>
    );
}

export default MealItem;