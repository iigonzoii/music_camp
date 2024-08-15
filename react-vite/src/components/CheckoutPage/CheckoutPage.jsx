// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import "./CheckoutPage.css";

// const CheckoutPage = () => {
//     //get cart items from local storage
//     const getCartItems = () => {
//         const cartItems = {}
//         Object.keys(localStorage).forEach((key) => {
//             try {
//                 const item = JSON.parse(localStorage.getItem(key));
//                 if (item && Object.prototype.hasOwnProperty.call(item, "user_id") &&
//                             Object.prototype.hasOwnProperty.call(item, "album_id")) {
//                     cartItems[key] = item;
//                 }
//             } catch (e) {
//                     //skipping cart item that are not JSON
//                 }
//         })
//         return cartItems
//     }
//     const currCart = getCartItems()

//     const [Quantity, setQuantity] = useState(1)
//     const handleQuantity = (e) => {
//         setQuantity(e.target.value)
//     }

//     const handleDeleteItem = (key) => {
//         "delete Item from cart"
//         // delete currCart[key]
//         // localStorage.removeItem('key')
//     }


//     return (
//         <div className='checkout-wrapper'>
//             {/* Hello from checkout! In development:
//             <ul>
//                 <li>Cart List</li>
//                 <li>Update Quantity Button</li>
//                 <li>Delete Item Button</li>
//                 <li>Demo checkout button to add to user collection</li>
//             </ul> */}

//             <ul className='checkout-cart-list'>
//                 Your Shopping Cart:
//                 {currCart && Object.keys(currCart).map(key => (
//                     <div key={key} className='checkout-cart-list-item'>
//                         <img
//                             id='checkout-cart-list-img'
//                             src={currCart[key].album_details.image}
//                         />

//                         <div className='checkout-cart-list-details'>
//                             <h4>{currCart[key].album_details.title} by {currCart[key].album_details.band}</h4>
//                             <p>${currCart[key].price * currCart[key].quantity} USD </p>
//                             <p>Quantity: <input
//                                             type="number"
//                                             defaultValue={currCart[key].quantity}
//                                             onChange={handleQuantity}
//                                         ></input>
//                             </p>
//                         </div>

//                         <NavLink></NavLink>
//                     </div>
//                 ))
//             }
//             </ul>
//         </div>
//     )
// }

// export default CheckoutPage
