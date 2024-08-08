
//*------ACTION TYPES---------
const LOAD_ALBUMS = "album/loadAlbums"
const LOAD_ALBUM = "album/loadAlbum"
const UPDATE_ALBUM = "album/updateAlbum"

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

//*---------THUNKS------------

//* Get all albums
export const fetchAlbums = () => async (dispatch) => {
    const response = await fetch('/api/albums');
    // csrfFetch
    const albums = await response.json();
    // console.log(albums)
    dispatch(loadAlbums(albums));
};


//* Get album by ID
export const fetchAlbum = (albumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${albumId}`)
    // csrfFetch
    const album = await response.json()
    dispatch(loadAlbum(album))
    return album
}

//* update album by ID
export const updateAlbum = (albumId, album) => async dispatch => {
    const response = await (`/api/albums/${albumId}`, {
        // csrfFetch
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
    const response = await (`/api/albums/${albumId}`, {
        // csrfFetch
        method: "DELETE"
    })
    dispatch(fetchCurrUserAlbums())
    return response
}

//* Get current users albums
export const fetchCurrUserAlbums = () => async (dispatch) => {
    const response = await ("/api/albums/current")
    // csrfFetch
    const albums = await response.json()
    dispatch(loadAlbums(albums.Albums))
}

//* Create an album
export const createAlbum = (album) => async (dispatch) => {
    const response = await (`/api/albums`, {
        // csrfFetch
        method: "POST",
        body: JSON.stringify(album),
        headers: { "Content-Type": "application/json" }
    })
    const newAlbum = await response.json()
    dispatch(loadAlbum(newAlbum))
    return newAlbum
}
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
        case LOAD_ALBUM:
            console.log(action.album.Album.id);
            const newState = { ...state };
            newState[action.album.Album.id] = action.album.Album;
            return newState;
            // return { ...state, albumDetail: {...action.album}};
        case UPDATE_ALBUM:
            return {...state, albumDetail: action.album}
        default:
            return state;
    }
};

export default albumReducer;
