
//*------ACTION TYPES---------
const LOAD_TRACKS = "review/loadTracks"
const ADD_TRACK = 'reviews/addTrack';
const DELETE_TRACK = 'reviews/DELETE_TRACK';

//*-------ACTION CREATORS---------
export const loadTracks = (tracks) => {
    return {
        type: LOAD_TRACKS,
        tracks
    }
}

export const addTrack = (track) => {
    return {
        type: ADD_TRACK,
        track
    }
}

export const deleteTrack = (track) => {
    return {
        type: DELETE_TRACK,
        track
    }
}

//*---------THUNKS------------

//* Get all tracks by Album id
export const fetchCurrUserTracks = () => async (dispatch) => {
    const response = await ("/api/tracks/current")
    // csrfFetch
    const tracks = await response.json()
    dispatch(loadReviews(tracks.Tracks))
}

//* Get all tracks by Album ID
export const fetchTracksByAlbum = (albumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${albumId}/tracks`)
    // csrfFetch
    const tracks = await response.json()
    dispatch(loadTracks(tracks))
}

//* Create a track by Album ID
export const createTrack = (track) => async (dispatch) => {
    const response = await (`/api/albums/${albumId}/tracks`, {
        // csrfFetch
        method: "POST",
        body: JSON.stringify(track),
        headers: { "Content-Type": "application/json" }
    })
    const newTrack = await response.json()
    dispatch(loadTrack(newTrack))
    return newTrack
}


//* Delete a track by id
export const removeTrack = trackId => async dispatch =>{
    const response = await (`/api/reviews/${TrackId}`, {
        method: "DELETE"
    })
    dispatch(fetchCurrUserTracks())
    return response
}


//*---------REDUCERS-----------

const initialState = { reviewDetail: {} };

const trackReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TRACKS: {
            let newState = {}
            action.tracks.tracks.forEach(track => {
                newState[track.id] = track
            })
            return newState
        }
        case LOAD_REVIEW:
            return { ...state, trackDetail: {...action.track}};
        case UPDATE_REVIEW:
            return {...state, trackDetail: action.track}
        default:
            return state;
    }
};

export default trackReducer;
