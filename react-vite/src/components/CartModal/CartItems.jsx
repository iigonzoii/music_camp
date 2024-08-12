

function cartItemsList() {
    const currCart = {}
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Get the key at index i
        const value = localStorage.getItem(key); // Get the value associated with the key
        currCart[key] = value; // Store the key-value pair in the object
    }

    return (
        <div>
            Hi from cart items list
        </div>
    )
}

export default cartItemsList
