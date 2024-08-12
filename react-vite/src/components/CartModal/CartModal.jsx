import { useState } from "react"
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import cartItemsList from "./CartItems";
import { createCartKey } from "../../../prettier";

import "./CartModal.css"

const CartModal = ({albumData}) => {
    // const navigate = useNavigate()
    let albums = useSelector(state => state.album)
    let currUser = useSelector(state => state.session.user)
    const albumById = albums[albumData.id].Album

    // function for actually adding items to local storage
    const postToLocalStorage = (payload) => {
        const albumKey = createCartKey(currUser.id, albumData.id, albumData.type)
        localStorage.setItem(albumKey, JSON.stringify(payload));
    }

    // const [items, setItems] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(albumData.price);
    const [errors, setErrors] = useState({})

    const handleQuantity = (e) => setQuantity(e.target.value);
    const handlePrice = (e) => setPrice(e.target.value);


    const handleAddCartSubmit = (e) => {
        e.preventDefault()

        const error = {}
        if (price < albumData.price) {
            error.price = `The minimum price is $${albumData.price}`}
        if (typeof price != Number) {
            error.price = 'Please provide a price'}
        if (quantity < albumData.amount) {
            error.quantity = "Not enough stock available"}

        const payload = {
            user_id: currUser.id,
            album_id: albumData.id,
            type: albumData.type,
            quantity,
            price
        }

        try {
            postToLocalStorage(payload)
        } catch (err) {
            // for 08/12: to mimic the data = await res.json(); functionality,
            // try pulling the item from localStorage like below:
            // data = JSON.parse(localStorage.getItem('uniqueKey'))
            // if (data?.errors) {setErrors etc etc}
            setErrors({...error})
        }
        // upon pressing add to cart button, add item to localStorage and closeModal
    }


    console.log("TESTHERE", albumData)

        // useEffect(() => {
    //     localStorage.setItem('items', JSON.stringify(items))
    //     console.log(items)
    // }, [items])

    // const handleAddItemCount = () => {
    //     "add +1 quantity of specific dict item"
    //     // currCart[key].quantity += 1
    //     // localStorage.setItem(key, currCart[key])
    // }

    // const handleRemoveItemCount = () => {
    //     "remove -1 quantity of specific dict item"
    //     // currCart[key].quantity -= 1
    //     // localStorage.setItem(key, currCart[key])
    // }

    // const handleDeleteItem = () => {
    //     "delete Item from cart"
    //     // delete currCart[key]
    //     // localStorage.removeItem('key')
    // }


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
            <button className="add-cart-btn" type='submit'>
                Add To Cart
            </button>
        </form>
    </div>
    )
}

export default CartModal
