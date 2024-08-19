//*------ACTION TYPES---------
const GET_ORDERS = "orders/GET_ORDERS"
const ADD_ORDER = "orders/ADD_ORDER"



//*-------ACTION CREATORS---------
export const getOrders = (orders) => {
    return {
        type: GET_ORDERS,
        payload: orders
    }
}

export const addOrder = (order) => {
    return {
        type: ADD_ORDER,
        payload: order
    }
}


//*---------THUNKS------------

// Get all Orders
export const fetchOrders = () => async (dispatch) => {
    const res = await fetch('/api/order/history')

    if (res.ok) {
        const data = await res.json();
        const orders = data.collection
        // console.log("THUNK",orders)
        dispatch(getOrders(orders))
    }
}


// Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
        const res = await fetch('/api/order/checkout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order),
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(addOrder(data));
            return data;
        } else {
            const err = await res.json();
            throw new Error(err.errors.message || 'Unexpected error occurred in reducer')
        }
    } catch (error) {
        console.error("Error creating order:", error);
    }
}


//*---------REDUCER-----------

const initialState = { allOrders: {} }
const orderReducer = (state=initialState, action) => {
    switch(action.type) { 
        case GET_ORDERS:
            let orders = {}
            action.payload.forEach(order => {
                orders[order.id] = order
            })
            return {
                ...state,
                allOrders: orders
            }

        case ADD_ORDER:
                return {
                    ...state,
                    allOrders: {
                        ...state.allOrders,
                        [action.payload.id]: action.payload}
                }

        default: return state;
        }
    }

export default orderReducer
