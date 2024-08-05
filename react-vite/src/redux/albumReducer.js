import { csrfFetch } from "./csrf"
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
    const response = await csrfFetch('/api/albums');
    const albums = await response.json();
    dispatch(loadAlbums(albums.data));
};



//*---------REDUCERS-----------
