

function cartItemsList() {
    const currCart = {}
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Get the key at index i
        const value = localStorage.getItem(key); // Get the value associated with the key
        currCart[key] = value; // Store the key-value pair in the object
    }

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
        <div>
            Hi from cart items list
        </div>
    )
}

export default cartItemsList
