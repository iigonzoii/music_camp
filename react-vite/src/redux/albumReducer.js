
//*------ACTION TYPES---------
const LOAD_ALBUMS = "album/loadAlbums"
const LOAD_ALBUM = "album/loadAlbum"
const UPDATE_ALBUM = "album/updateAlbum"
const CREATE_ALBUM = "album/createAlbum"
const CREATE_PRODUCTS = "album/createProducts"


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

export const update = (updatedAlbum) => {
    return {
        type: UPDATE_ALBUM,
        updatedAlbum
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

//* update album by ID
export const updateAlbum = (albumId, album) => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}/`, {
        method: 'Put',
        body: JSON.stringify(album)
    })
    if (response.ok) {
        const updatedAlbum = await response.json()
        dispatch(update(updatedAlbum))
        return updatedAlbum
    } else {
        const errors = await response.json()
        return errors
    }
}

//* delete album by id
export const deleteAlbum = albumId => async dispatch =>{
    const response = await fetch(`/api/albums/${albumId}/`, {
        method: "DELETE"
    })
    dispatch(fetchCurrUserAlbums())
    return response
}

//* Get current users albums
export const fetchCurrUserAlbums = () => async (dispatch) => {
    const response = await fetch("/api/albums/current")
    const albums = await response.json()
    dispatch(loadAlbums(albums.Albums))
}

//* Create an album
export const createAlbum = (album) => async (dispatch) => {
    try {
        const response = await fetch(`/api/albums/`, {
            method: "POST",
            body: JSON.stringify(album),
            headers: { "Content-Type": "application/json" }
        });

        console.log("FetchResponse", response);

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
        case UPDATE_ALBUM:
            return {...state, albumDetail: action.album}
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
                
        
        default:
            return state;
    }
};

export default albumReducer;
