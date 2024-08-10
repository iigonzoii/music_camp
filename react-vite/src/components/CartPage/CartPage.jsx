import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

import "./CartPage.css"

const CartPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [items, setItems] = useState([])

    // hashing function to get a unique cart item identifier to use
    // the key for each item in the cart

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
        console.log(items)
    }, [items])


    return (
        <div>
                {JSON.parse(localStorage.getItem('key'))}
        </div>
    )
}
