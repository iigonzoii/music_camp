import { useState } from "react";
import { useSelector } from "react-redux";

function CheckoutItem({itemKey, currCart}) {
    const currUser = useSelector(state => state.session.user)

    console.log("CURRCART", currCart[itemKey])

    const [quantity, setQuantity] = useState(1)
    const handleQuantity = (e, key) => {
        const newQuantity = e.target.value
        setQuantity(newQuantity);
        if (newQuantity != currCart[key].quantity) {
            currCart[key].quantity = parseInt(newQuantity)
            localStorage.setItem(key, JSON.stringify(currCart[key]))
        }
    }

    const handleDeleteItem = (key) => {
        localStorage.removeItem(key)
    }

    return (
            <div key={itemKey} className='checkout-cart-list-item'>
                <img
                    id='checkout-cart-list-img'
                    src={currCart[itemKey].album_details.image}
                />

                <div className='checkout-cart-list-details'>
                    <h4>{currCart[itemKey].album_details.title} by {currCart[itemKey].album_details.band}</h4>
                    <p>${currCart[itemKey].price * currCart[itemKey].quantity} USD </p>
                    <p>Quantity: <input
                                    type="number"
                                    defaultValue={currCart[itemKey].quantity}
                                    onChange={(e) => handleQuantity(e, itemKey)}
                                ></input>
                    </p>


                    <button
                        className='delete-cart-item'
                        onClick={() => handleDeleteItem(itemKey)}
                    >Delete</button>
                </div>
            </div>
    )
}

export default CheckoutItem
