import { useState } from "react"
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { createCartKey } from "../../../prettier";

import CartItemsList from "./CartItems";
import "./CartModal.css"

const CartModal = ({albumData}) => {
    const { albumId } = useParams()
    const navigate = useNavigate()
    let albumById = useSelector(state => state.album[albumId]?.Album)
    let currUser = useSelector(state => state.session.user)
    const { closeModal } = useModal()

    const albumKey = createCartKey(currUser.id, albumData.id, albumData.type)
    // const item = JSON.parse(localStorage.getItem(albumKey))

    // console.log("ALBUMDATA", albumData)

    const postToLocalStorage = (payload) => {
        localStorage.setItem(albumKey, JSON.stringify(payload));
        return payload
    }

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [navToCheckout, setNavToCheckout] = useState(false)

    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({})

    const handleQuantity = (e) => setQuantity(e.target.value);
    const handlePrice = (e) => {
        // if the field is empty, then return
        if (e.target.value == 0) {
            return;
        } else {
            setPrice(parseFloat(e.target.value));
        }
    }

    const isValidPrice = (price) => {
        const pricestr = price.toString().trim();
        const regex = /^\d+(\.\d{0,2})?$/;
        return regex.test(pricestr);
    };

    const handleAddCartSubmit = (e) => {
        e.preventDefault()

        try {
            const error = {}
            if (price < albumData.price) {
                error.price = `The minimum price is $${albumData.price}`}
            if (typeof price != "number") {
                error.price = 'Please provide a price'}
            if (!isValidPrice(price)) {
                error.price = 'Please provide a valid price'}
            if (quantity > albumData.amount) {
                error.quantity = "Not enough stock available"}

            if (Object.keys(error).length > 0) {
                setErrors({...error});
                setTimeout(() => setErrors({}), 7000)
                return;
            }

            //check to see if the item is already in cart. If it is, increment quantity
            const existingItem = JSON.parse(localStorage.getItem(albumKey))

            //handle if desired price is different than what is in cart
            if (existingItem && price != existingItem?.price) {
                existingItem.price = price
                postToLocalStorage(existingItem)
                setPrice(parseFloat(price.toFixed(2)))
            }

            const payload = {
                user_id: currUser.id,
                album_id: albumData.album_id,
                album_details: {
                    band: albumById.band,
                    title: albumById.title,
                    image: albumById.cover_image_url
                },
                type: albumData.type,
                quantity,
                price,
                min_price: albumData.price
            }

            // handle if item is already existing in cart
            if (existingItem) {
                existingItem.quantity += parseInt(quantity)
                postToLocalStorage(existingItem)

                setErrors({})
                setMessage('Quantity updated successfully!')
                setTimeout(() => setMessage(''), 5000)
            } else {
                postToLocalStorage(payload)

                setMessage('Item successfully added to cart!')
                setTimeout(() => setMessage(''), 5000)
            }

            if (navToCheckout) {
                navigate('/checkout')
                closeModal()
            }
        } catch (err) {
            // if no set errors, but still errors persist, then generic message is thrown
            if(err) {
                setErrors({...err, message: "An unexpected error occurred."})
            }
        }
    }

    return (
    <div id='cart-modal-wrapper'>
        <div className="cart-product-info">
            <h1>{albumById.title} by {albumById.band} ({albumData.type})</h1>
            {/* <p>{albumData}</p> */}
        </div>

        <div className='cart-form-and-list'>
            <form className='cartModal-forms' onSubmit={handleAddCartSubmit}>
                <div className="cartModal-form-field">
                    <h4>Enter Amount:</h4>
                    <input
                        onChange={handlePrice}
                        placeholder={`$${albumData.price}`}
                    ></input>
                    <p>USD (${albumData.price} or more)</p>
                    <p className="errors">{errors.price}</p>
                </div>
                <div className="cartModal-form-field">
                    <h4>Quantity:</h4>
                    <input
                        onChange={handleQuantity}
                        type="number"
                        min="1" max={albumData.amount}
                        defaultValue="1"
                    ></input>
                    <p className="errors">{errors.quantity}</p>
                </div>

                <div className='cart-modal-btns'>
                    <button className="checkout-btn" type="submit" onClick={() => setNavToCheckout(true)}>
                        Checkout
                    </button>
                    <button className="add-cart-btn" type='submit' onClick={() => setNavToCheckout(false)}>
                    🛒  Add To Cart
                    </button>

                </div>

                <p>{message}</p>
            </form>

            <div>
                <CartItemsList />
            </div>
        </div>
    </div>
    )
}

export default CartModal
