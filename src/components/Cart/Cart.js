import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import React, { useState, useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckout, SetIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    }

    const cartItems = (
            <ul className={classes['cart-items']}>
                {cartCtx.items.map(item => 
                    <CartItem name={item.name} key={item.id} price={item.price} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />    
                )}
            </ul>
        )

    const orderHandler = () => {
        SetIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://food-app-f0cf3-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user:userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCartItem();
    }

    const modalActions = <div className={classes.actions}>
            <button
            onClick={props.onHideCart} className={classes['button--alt']}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>

    const cartModalContent = 
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onClose={props.onHideCart}/>}
            {!isCheckout && modalActions}
        </React.Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = <React.Fragment>
        <p>Successfully send the order data</p>
        <div className={classes.actions}>
            <button
            onClick={props.onHideCart} className={classes.button}>Close</button>
        </div>
        </React.Fragment>

    return (
        <Modal onClose={props.onHideCart} className={classes['cart-items']}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;