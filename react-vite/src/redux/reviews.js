
//*------ACTION TYPES---------
const LOAD_REVIEWS = "review/loadReviews"
const ADD_REVIEW = 'reviews/addReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview';

//*-------ACTION CREATORS---------
export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

export const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

export const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
}

//*---------THUNKS------------

//* Get current users reviews
export const fetchCurrUserReviews = () => async (dispatch) => {
    const response = await ("/api/reviews/current")
    // csrfFetch
    const reviews = await response.json()
    dispatch(loadReviews(reviews.Reviews))
}

//* Get all reviews by Album ID
export const fetchReviewsByAlbum = (albumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${albumId}/reviews`)
    // csrfFetch
    const reviews = await response.json()
    dispatch(loadReviews(reviews))
}

//* Create a review by Album ID
export const createReview = (review) => async (dispatch) => {
    const response = await (`/api/albums/${albumId}/reviews`, {
        // csrfFetch
        method: "POST",
        body: JSON.stringify(review),
        headers: { "Content-Type": "application/json" }
    })
    const newReview = await response.json()
    dispatch(loadReview(newReview))
    return newReview
}

//* Update a review by ID
export const editReview = (reviewId, review) => async dispatch => {
    const response = await (`/api/reviews/${reviewId}`, {
        // csrfFetch
        method: 'Put',
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const updatedreview = await response.json()
        dispatch(update(updatedreview))
        return updatedreview
    } else {
        const errors = await response.json()
        return errors
    }
}

//* Delete a review by id
export const removeReview = reviewId => async dispatch =>{
    const response = await (`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })
    dispatch(fetchCurrUserReviews())
    return response
}


//*---------REDUCERS-----------

const initialState = { reviewDetail: {} };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            let newState = {}
            action.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        }
        case ADD_REVIEW: {
            return {
                ...state,
                [action.review.id]: action.review,
            };
        }
        case UPDATE_REVIEW:
            return {...state, reviewDetail: action.review}
        case DELETE_REVIEW: {
            let newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }
        default:
            return state;
    }
};

export default reviewReducer;
