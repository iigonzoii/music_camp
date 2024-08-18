import { useState } from "react";
// import { useSelector } from "react-redux";

function CheckoutItem({itemKey, currCart, handleDeleteItem, setCartTotal}) {
    // const currUser = useSelector(state => state.session.user)

    const [errors, setErrors] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(currCart[itemKey]?.price)

    const handleQuantity = (e, key) => {
        const newQuantity = e.target.value
        const error = {}
        if (newQuantity < 1) {
            error.quantity = 'Quantity cannot be less than 1'
        } else if (newQuantity != currCart[key].quantity) {
            setQuantity(newQuantity);
            currCart[key].quantity = parseInt(newQuantity)
            setCartTotal(newQuantity*price)
            localStorage.setItem(key, JSON.stringify(currCart[key]))
        }
    }

    const isValidPrice = (price) => {
        const pricestr = price.toString().trim();
        const regex = /^\d+(\.\d{0,2})?$/;
        return regex.test(pricestr);
    };

    const handlePrice = (e) => {
        const error = {}
        const chosenPrice = parseFloat(e.target.value)

        if (isNaN(chosenPrice)) {
            error.price = 'Please provide a valid price'}
        if (chosenPrice < currCart[itemKey]?.min_price) {
            error.price = `The minimum price is $${currCart[itemKey]?.min_price}`}
        if (typeof chosenPrice != "number") {
            error.price = 'Please provide a price'}
        if (!isValidPrice(chosenPrice)) {
            error.price = 'Please provide a valid price'}

        if (Object.keys(error).length > 0) {
            setErrors({...error});
            setTimeout(() => setErrors({}), 7000)

            setPrice(currCart[itemKey].min_price)
            e.target.value = currCart[itemKey].min_price;
            currCart[itemKey].price = currCart[itemKey].min_price
            localStorage.setItem(itemKey, JSON.stringify(currCart[itemKey]))
            return;
        } else {
            if (chosenPrice !== currCart[itemKey].price) {
                setPrice(chosenPrice);
                currCart[itemKey].price = chosenPrice
                setCartTotal(chosenPrice * quantity)
                localStorage.setItem(itemKey, JSON.stringify(currCart[itemKey]))
            }
        }
    }

    if (Object.values(currCart).length < 1) {
        return (<p>Loading...</p>)
    }

    return (
            <div key={itemKey} className='checkout-cart-list-item'>
                <img
                    id='checkout-cart-list-img'
                    src={currCart[itemKey].album_details.image}
                />

                <div className='checkout-cart-list-details'>
                    <h4>{currCart[itemKey].album_details.title} by {currCart[itemKey].album_details.band} ({currCart[itemKey].type})</h4>
                    <p>Price: $<input
                                className='checkout-input-price'
                                type="number"
                                value={price}
                                onChange={handlePrice}
                            ></input>
                    </p>
                    <p>Quantity: <input
                                    className='checkout-input-quantity'
                                    type="number"
                                    value={currCart[itemKey].quantity}
                                    onChange={(e) => handleQuantity(e, itemKey)}
                                    ></input>
                    </p>
                    <p>${currCart[itemKey].price * currCart[itemKey].quantity} USD </p>

                    {/* ERROR MESSAGES FOR IMPROPER PRICE/QUANTITY ENTRIES*/}
                    {errors.price && <p className='errors'>{errors.price}</p>}
                    {errors.quantity && <p className='errors'>{errors.quantity}</p>}

                    <button
                        className='delete-cart-item'
                        onClick={() => handleDeleteItem(itemKey)}
                    >Delete</button>
                </div>
            </div>
    )
}

export default CheckoutItem
