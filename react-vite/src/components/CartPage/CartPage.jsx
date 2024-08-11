import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

import "./CartPage.css"

const CartPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [items, setItems] = useState([])

    currCart = {}
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Get the key at index i
        const value = localStorage.getItem(key); // Get the value associated with the key
        currCart[key] = value; // Store the key-value pair in the object
    }

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
        console.log(items)
    }, [items])

    const handleAddItemCount = (e) => {
        "add +1 quantity of specific dict item"
        // currCart[key].quantity += 1
        // localStorage.setItem(key, currCart[key])
    }

    const handleRemoveItemCount = (e) => {
        "remove -1 quantity of specific dict item"
        // currCart[key].quantity -= 1
        // localStorage.setItem(key, currCart[key])
    }

    const handleDeleteItem = (e) => {
        "delete Item from cart"
        // delete currCart[key]
        // localStorage.removeItem('key')
    }

    return (
        <div id='cart-page-wrapper'>
            <h1>Hello from Shopping Cart!</h1>
        </div>
    )
}

export default CartPage
