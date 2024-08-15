
//*------ACTION TYPES---------
const LOAD_TRACKS = "tracks/loadTracks"
// const LOAD_TRACK = "tracks/loadTrack"
const ADD_TRACK = 'tracks/addTrack';
const DELETE_TRACK = 'tracks/DELETE_TRACK';

//*-------ACTION CREATORS---------
export const loadTracks = (tracks) => {
    return {
        type: LOAD_TRACKS,
        tracks
    }
}

// export const loadTrack = (track) => {
//     return {
//         type: LOAD_TRACK,
//         track
//     }
// }

export const addTrack = (track) => {
    return {
        type: ADD_TRACK,
        track
    }
}

export const deleteTrack = (trackId) => {
    return {
        type: DELETE_TRACK,
        trackId
    }
}

//*---------THUNKS------------

// //* Get all tracks
// //* Not an MVP feature
// export const fetchTracks = () => async (dispatch) => {
//     const response = await fetch("/api/tracks/current")
//     const tracks = await response.json()
//     dispatch(loadTracks(tracks.Tracks))
// }

//* Get all tracks by Album ID
export const fetchTracksbyAlbumId = (albumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${albumId}/tracks`)
    const tracks = await response.json()
    dispatch(loadTracks(tracks))
}

//* Create a track by Album ID
// Requires attention
export const createTrack = (track, albumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${albumId}/`, {
        method: "POST",
        body: JSON.stringify(track),
        headers: { "Content-Type": "application/json" }
    })
    const newTrack = await response.json()
    dispatch(addTrack(newTrack))
    return newTrack
}

//* Delete a track by id
export const removeTrack = (trackId) => async (dispatch) =>{
    const response = await fetch(`/api/tracks/${trackId}/`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteTrack(trackId))
    }
    return response
}


//*---------REDUCERS-----------

const initialState = {};

const trackReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TRACKS: {
            const newState = {}
            action.tracks.tracks?.forEach(track => {
                newState[track.id] = track
            })
            return newState
        }
        case ADD_TRACK:
            return {
                ...state, [action.track.id]: action.track,
            };
        case DELETE_TRACK: {
            const newState = { ...state };
            delete newState[action.trackId];
            return newState;
        }
        default:
            return state;
    }
};

export default trackReducer;
