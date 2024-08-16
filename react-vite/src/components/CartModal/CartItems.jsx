import { useSelector } from 'react-redux'
import './CartItems.css'

function CartItemsList() {
    const user = useSelector((state) => state.session.user);

    const getCartItems = () => {
        const cartItems = {}

        Object.keys(localStorage).forEach((key) => {
            try {
                const item = JSON.parse(localStorage.getItem(key));
                if (item && Object.prototype.hasOwnProperty.call(item, "user_id") &&
                            Object.prototype.hasOwnProperty.call(item, "album_id") &&
                            item.user_id == user.id) {
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
        <div className='cartItems-wrapper'>
            <h4>Your Shopping Cart</h4>
            <ul className='cart-list-content'>
                {Object.keys(currCart).length ? Object.keys(currCart).map(key => (
                    <div key={key} id='cart-list-item'>
                        <img
                            id='cart-list-img'
                            src={currCart[key].album_details.image}
                        />

                        <div id='cart-list-details'>
                            <h4>{currCart[key].album_details.title} by {currCart[key].album_details.band}</h4>
                            <p> {currCart[key].type} • Count: {currCart[key].quantity}</p>
                            <p>${currCart[key].price * currCart[key].quantity} USD </p>
                        </div>
                    </div>
                )) : <li>Your cart is empty!</li> }
            </ul>
        </div>
    )
}

export default CartItemsList
