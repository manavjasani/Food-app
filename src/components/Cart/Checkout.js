import classes from "./Checkout.module.css";
import { useState, useRef } from "react";


const isEmpty = value => value.trim().length === 0;
const fiveChar = value => value.trim().length === 5;

const Checkout = props => {
    const nameInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    const streetInputRef = useRef();

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    })

    const confirmHandler = event => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeValid = fiveChar(enteredPostalCode);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeValid,
            city: enteredCityIsValid
        })

        const formValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeValid;

        if (!formValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredCity,
            postalCode: enteredPostalCode,
            city: enteredCity
        });
    }

    return (
        <form onSubmit={confirmHandler} className={classes.form}>
            <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!formInputValidity.street && <p>Please enter a valid street</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalCodeInputRef} />
                {!formInputValidity.postalCode && <p>Please enter a valid postal code (5 characters)</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputValidity.city && <p>Please enter a valid city anme</p>}
            </div>
            <div className={classes.actions}>
                <button  onClick={props.onClose}>Cancel</button>
                <button>Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;