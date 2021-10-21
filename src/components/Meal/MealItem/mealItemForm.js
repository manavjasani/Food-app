import Input from "../../UI/Input";
import classes from "./mealItemForm.module.css";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const [isValid, setIsValid] = useState(true);

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount" ref={amountInputRef} input= {{
                type: "number",
                id: 'amount_' + props.id,
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button>+ Add</button>
            {!isValid && <p>Please entered a valid number (1-5)</p>}
        </form>
    );
}

export default MealItemForm;