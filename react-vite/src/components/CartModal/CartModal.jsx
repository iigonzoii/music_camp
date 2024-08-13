import { useState } from "react"
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { createCartKey } from "../../../prettier";

import "./CartModal.css"

const CartModal = ({albumData}) => {
    const { albumId } = useParams()
    const navigate = useNavigate()
    let albumById = useSelector(state => state.album[albumId]?.Album)
    let currUser = useSelector(state => state.session.user)
    const { closeModal } = useModal()

    const albumKey = createCartKey(currUser.id, albumData.id, albumData.type)
    const item = JSON.parse(localStorage.getItem(albumKey))
    // function for actually adding items to local storage
    const postToLocalStorage = (payload) => {
        localStorage.setItem(albumKey, JSON.stringify(payload));
        return payload
    }

    // const [items, setItems] = useState([]);
    const [quantity, setQuantity] = useState(item ? parseInt(item.quantity) : 1);
    const [price, setPrice] = useState(parseInt(albumData.price));
    const [navToCheckout, setNavToCheckout] = useState(false)
    const [errors, setErrors] = useState({})

    const handleQuantity = (e) => setQuantity(e.target.value);
    const handlePrice = (e) => setPrice(parseInt(e.target.value));

    const handleAddCartSubmit = (e) => {
        e.preventDefault()

        const error = {}
        if (price < albumData.price) {
            error.price = `The minimum price is $${albumData.price}`}
        if (typeof price != "number") {
            error.price = 'Please provide a price'}
        if (quantity > albumData.amount) {
            error.quantity = "Not enough stock available"}

        if (Object.keys(error).length > 0) {
            setErrors({...error});
        }

        const payload = {
            user_id: currUser.id,
            album_id: albumData.id,
            type: albumData.type,
            quantity,
            price
        }

        try {
            //check to see if the item is already in cart. If it is,
            const existingItem = JSON.parse(localStorage.getItem(albumKey))
            if (existingItem) {
                existingItem.quantity += 1
                postToLocalStorage(existingItem)
            } else {
                postToLocalStorage(payload)
            }

            if (navToCheckout) {
                navigate('/checkout')
                closeModal()
            }
        } catch (err) {
            // get the stored item
            const data = JSON.parse(localStorage.getItem(albumKey));

            // check if data has any errors
            if(data?.errors) {
                setErrors({...error})
            } else {
                // if no set errors, but still errors persist, then generic message is thrown
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

        <form onSubmit={handleAddCartSubmit}>
            <div className="set-price">
                <h4>Enter Amount:</h4>
                <input
                    onChange={handlePrice}
                    placeholder={`$${albumData.price}`}
                ></input>
                <p>US (${albumData.price} or more)</p>
                <p className="errors">{errors.price}</p>
            </div>
            <div className="set-quantity">
                <h4>Quantity:</h4>
                <input
                    onChange={handleQuantity}
                    type="number"
                    min="1" max={albumData.amount}
                    defaultValue="1"
                ></input>
                <p className="errors">{errors.quantity}</p>
            </div>
            <button className="add-cart-btn" type='submit' onClick={() => setNavToCheckout(false)}>
                Add To Cart
            </button>

            <button className="checkout" type="submit" onClick={() => setNavToCheckout(true)}>
                Checkout
            </button>
        </form>
    </div>
    )
}

export default CartModal
