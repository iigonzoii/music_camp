import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { createOrder } from "../../redux/orderReducer";
import CheckoutItem from "./CheckoutItem";
import "./CheckoutPage.css";

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currUser = useSelector(state => state.session.user)
    //get cart items from local storage
    const [currCart, setCurrCart] = useState({})
    const [cartTotal, setCartTotal] = useState(0)

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

    useEffect(() => {
        setCurrCart(getCartItems())
    }, [])

    useEffect(() => {
        const cartTotal = Object.values(currCart).reduce((totalPrice, cartItem) => {
                return totalPrice + (cartItem.quantity * cartItem.price)
            }, 0)
        setCartTotal(cartTotal)
    }, [currCart, cartTotal])

    const handlePurchase = async (e) => {
        e.preventDefault()

        const checkout = Object.values(currCart).map(cartItem => ({
            album_id: cartItem.album_id,
            type: cartItem.type,
            quantity: cartItem.quantity,
            price: cartItem.price,
        }))

        try {
            const checkoutOrder = await dispatch(createOrder(checkout))

            if (checkoutOrder?.errors) {
                throw new Error(res.errors.message || 'An unexpected error has occurred')
            }

            if (checkoutOrder) {
                localStorage.clear()
                navigate("/home")
            }
        } catch (error) {
            console.error("Error creating order:", error.message);
        }
    }

    const handleDeleteItem = (key) => {
        localStorage.removeItem(key)
        setCurrCart(getCartItems())
    }

    return (Object.values(currCart).length == 0 ?
    // IF NO ITEMS IN CART
    <div className="empty-cart-checkout">
        <p>
            No items are in your cart. <NavLink className="empty-cart-NavLink" to="/">Explore Music</NavLink>
        </p>
    </div> :

    // IF THERE ARE ITEMS IN CART, THEN RENDER THE BELOW
        <div className='checkout-wrapper'>
            <div className='shopping-cart'>
                <ul className='checkout-cart-list'>
                    <h2>Your Shopping Cart</h2>
                    {currCart && Object.keys(currCart).map(key => (
                        <div key={key}>
                            <CheckoutItem itemKey={key}
                                        currCart={currCart}
                                        handleDeleteItem={handleDeleteItem}
                                        setCartTotal={setCartTotal}
                            />
                        </div>
                    ))}
                </ul>
            </div>

            <div className="checkout-module">
                <h3>Order Summary</h3>
                <div className="checkout-line">
                    <p>{Object.keys(currCart).length} items</p>
                    <p>${cartTotal.toFixed(2)}</p>
                </div>
                <div className="checkout-line">
                    <p>Sales Tax</p>
                    <p>${(cartTotal*0.0925).toFixed(2)}</p>
                </div>

                <div className='checkout-total'>
                    <p>Total</p>
                    <p>${(cartTotal*1.0925).toFixed(2)}</p>
                </div>

                <button className='demo-checkout-btn' onClick={handlePurchase}>
                    Demo Checkout
                </button>
            </div>


        </div>
    )
}

export default CheckoutPage
