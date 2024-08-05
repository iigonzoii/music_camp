// import { csrfFetch } from "./csrf"
// ! i dont know if i need csrf fetches to be used or not


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
    const response = await ('/api/albums');
    // csrfFetch
    const albums = await response.json();
    dispatch(loadAlbums(albums.data));
};



//*---------REDUCERS-----------

const initialState = { spotDetail: {} };

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALBUMS: {
            // console.log("ACTIONNNN",action)
            let newState = {}
            action.albums.forEach(album => {
                newState[album.id] = album
            })
            return newState
        }
        case LOAD_ALBUM:
            return { ...state, albumDetail: {...action.album}};
        case UPDATE_ALBUM:
            return {...state, albumDetail: action.album}
        default:
            return state;
    }
};

export default albumReducer;
