import CartContext from "./cart-context";
import { useReducer } from "react";

const initialState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        console.log(existingCartItem)

        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            console.log(updatedItem)
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item)
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }

    if(action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];

        const updatedAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return {
            items: updatedItems,
            totalAmount: updatedAmount
        };
    }

    if(action.type === 'CLEAR') {
        return initialState;
    }
    
    return initialState;
}

const CartProvider = (props) => {
    const [cartState, cartDispatchAction] = useReducer(cartReducer, initialState);

    const addItemToCartHandler = (item) => {
        cartDispatchAction({ type: 'ADD', item: item})
    }

    const removeItemToCartHandler = (id) => {
        cartDispatchAction({ type: 'REMOVE', id: id})
    }

    const clearCartHandler = () => {
        cartDispatchAction({type: 'CLEAR'})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        clearCartItem: clearCartHandler
    }
    
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;