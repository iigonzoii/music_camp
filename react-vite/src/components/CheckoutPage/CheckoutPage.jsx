import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CheckoutItem from "./CheckoutItem";
import "./CheckoutPage.css";

const CheckoutPage = () => {
    const currUser = useSelector(state => state.session.user)
    //get cart items from local storage
    const getCartItems = () => {
        const cartItems = {}
        Object.keys(localStorage).forEach((key) => {
            try {
                const item = JSON.parse(localStorage.getItem(key));
                if (item && Object.prototype.hasOwnProperty.call(item, "user_id") &&
                            Object.prototype.hasOwnProperty.call(item, "album_id") &&
                            item.user_id == currUser.id) {
                    cartItems[key] = item;
                }
            } catch (e) {
                    //skipping cart item that are not JSON
                }
        })
        return cartItems
    }
    const currCart = getCartItems()


    return (
        <div className='checkout-wrapper'>
            {/* Hello from checkout! In development:
            <ul>
                <li>Cart List</li>
                <li>Update Quantity Button</li>
                <li>Delete Item Button</li>
                <li>Demo checkout button to add to user collection</li>
            </ul> */}

            <ul className='checkout-cart-list'>
                Your Shopping Cart:
                {currCart && Object.keys(currCart).map(key => (
                    <div>
                        <CheckoutItem itemKey={key} currCart={currCart}/>
                    </div>
                ))
            }
            </ul>
        </div>
    )
}

export default CheckoutPage
