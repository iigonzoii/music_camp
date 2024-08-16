// import { compose } from "redux"

//*------ACTION TYPES---------
const LOAD_ALBUMS = "album/loadAlbums"
const LOAD_ALBUM = "album/loadAlbum"
const UPDATE_ALBUM = "album/updateAlbum"
const CREATE_ALBUM = "album/createAlbum"
const CREATE_PRODUCTS = "album/createProducts"
const USER_ALBUMS =    "album/loadUserAlbums"
const DELETE_ALBUM = "album/deleteAlbum"
const UPDATE_PRODUCTS = "album/updateProducts"


//*-------ACTION CREATORS---------
export const loadAlbums = (albums) => {
    return {
        type: LOAD_ALBUMS,
        albums
    }
}

export const loadAlbum = (album) => {
    return {
        type: LOAD_ALBUM,
        album
    }
}

export const updateAlbum = (albumId, payload) => {
    return {
        type: UPDATE_ALBUM,
        albumId,
        payload,
    };
};

export const updateProducts = (albumId, payload) => {
    return {
        type: UPDATE_PRODUCTS,
        albumId,
        payload,
    }
}


export const addAlbum = (album) => ({
    type: CREATE_ALBUM,
    album
});

export const addProducts = ( products) => ({
    type: CREATE_PRODUCTS,
    products
});

export const loadUserAlbums = (albums) => ({
    type: USER_ALBUMS,
    albums
});

export const removeAlbum = (albumId) => ({
    type: DELETE_ALBUM,
    albumId
})


//*---------THUNKS------------

//* Get all albums
export const fetchAlbums = () => async (dispatch) => {
    const response = await fetch('/api/albums');
    const albums = await response.json();
    // console.log(albums)
    dispatch(loadAlbums(albums));
};


//* Get album by ID
export const fetchAlbum = (albumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${albumId}`)
    const album = await response.json()
    dispatch(loadAlbum(album))
    return album
}

//* Update album by ID
export const fetchUpdateAlbum = (album) => async (dispatch) => {
    // console.log('Album',album);
    try {
        const res = await fetch(`/api/albums/${album.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(album),
        });


        if (res.ok) {
            const data = await res.json();

          // console.log('Data',data)

            dispatch(updateAlbum(album.id, data));
        } else {
            console.error("Failed to load album");
        }
    } catch (err) {
        console.error("Error loading album", err);
    }
};


//* delete album by id
export const deleteAlbum = (albumId) => async (dispatch) =>{
    try {
        const res = await fetch(`/api/albums/${albumId}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            dispatch(removeAlbum(albumId));
        }
    } catch (err) {
        console.error("Error deleting album", err);
    }
}

//* Get current user's albums
export const fetchCurrUserAlbums = () => async (dispatch) => {
    try {
        const res = await fetch("/api/albums/current", {
            headers: { "Content-Type": "application/json" }
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(loadUserAlbums(data));
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch albums");
        }
    } catch (err) {
        console.error("Error loading albums", err);
    }
};


//* Create an album
export const createAlbum = (album) => async (dispatch) => {
    try {
        const response = await fetch(`/api/albums/`, {
            method: "POST",
            body: JSON.stringify(album),
            headers: { "Content-Type": "application/json" }
        });

        // console.log("FetchResponse", response);

        if (response.ok) {
            const newAlbum = await response.json();
            dispatch(addAlbum(newAlbum));
            return newAlbum;
        } else {
            const errors = await response.json();
            throw errors;
        }
    } catch (err) {
        console.error("Error creating album", err);
    }
};

//* Create a product by Album ID
export const createProducts = (albumId, products) => async (dispatch) => {
    const productData = products.product_types
    const response = await fetch(`/api/albums/products/${albumId}/`, {
        method: "POST",
        body: JSON.stringify(productData),
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create products');
    }

    const newProducts = await response.json();
    dispatch(addProducts(newProducts));
    return newProducts;
};


export const fetchUpdateProducts = (albumId, payload) => async (dispatch) => {
    try {
        const res = await fetch(`/api/albums/${albumId}/products`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload.product_types),
        });

        if (res.ok) {
            const data = await res.json();
            // console.log('Updated product types:', data);
            dispatch(updateProducts(albumId, data.product_types));
        } else {
            console.error("Failed to update product types");
        }
    } catch (err) {
        console.error("Error updating product types", err);
    }
};



//*---------REDUCERS-----------

const initialState = { albumDetail: {} };

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALBUMS: {
            let newState = {}
            action.albums.albums.forEach(album => {
                newState[album.id] = album
            })
            return newState
        }
        case LOAD_ALBUM:{
            const newState = { ...state };
            const updatedAlbum = {
                ...action.album,
                UserAlbums: action.album.UserAlbums
            };
            newState[action.album.Album.id] = updatedAlbum;
            return newState;
        }
            // return { ...state, albumDetail: {...action.album}};
            case UPDATE_ALBUM: {
                // console.log(action.payload)
                return {
                    ...state,
                    albumDetail: action.payload
                };
            }
            case UPDATE_PRODUCTS: {
                const { albumId, payload } = action;
                // console.log("Payload:", payload)
                return {
                    ...state,
                    [albumId]: {
                        ...state[albumId],
                        products: payload
                    }
                };
            }

        case CREATE_ALBUM:
                return {
                    ...state,
                    [action.album.id]: action.album
                };
        case CREATE_PRODUCTS: {
                    const newState = { ...state };
                    action.products.products.forEach(product => {
                        newState[product.id] = product;
                    });
                    return newState;
                }
        case USER_ALBUMS: {
                    const newState = {};
                    action.albums.albums.forEach(album => {
                        newState[album.id] = album
                    })
                    return {  ...newState}
                }
        case DELETE_ALBUM: {
            const newState = { ...state };
            delete newState[action.albumId];
            return newState;
        }


        default:
            return state;
    }
};

export default albumReducer;
