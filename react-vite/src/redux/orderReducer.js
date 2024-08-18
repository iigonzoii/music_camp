//*------ACTION TYPES---------
const GET_ORDERS = "orders/GET_ORDERS"
const ADD_ORDER = "orders/ADD_ORDER"



//*-------ACTION CREATORS---------
export const getOrders = (orders) => {
    return {
        type: GET_ORDERS,
        orders
    }
}

export const addOrder = (order) => {
    return {
        type: ADD_ORDER,
        order
    }
}


//*---------THUNKS------------

// Get all Orders
export const fetchOrders = () => async (dispatch) => {
    const res = await fetch('/api/order/history')

    if (res.ok) {
        const data = await res.json();
        dispatch(getOrders(data))
    }
}


// Create Order
export const createOrder = (order) => async (dispatch) => {
    const res = await fetch('/api/order/checkout', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order),
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addOrder(data))
    }
}


//*---------REDUCER-----------

const initialState = { orders: {} }
const orderReducer = (state=initialState, action) => {
    switch(action.type) { 
        case GET_ORDERS:
            return {...state, allOrders: {...action.orders}}

        case ADD_ORDER:
            return {
                ...state,
                allOrders: {...state.orders, [action.order.id]: action.order}
            }

        default: return state;
    }
}

export default orderReducer
