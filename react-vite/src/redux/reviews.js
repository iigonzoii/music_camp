
//*------ACTION TYPES---------
const LOAD_REVIEWS = "review/loadReviews"
// const LOAD_REVIEW = "review/loadReview"
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
// const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

//*-------ACTION CREATORS---------
export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

// export const loadReview = (review) => {
//     return {
//         type: LOAD_REVIEW,
//         review
//     }
// }

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

// export const deleteReview = (review) => {
//     return {
//         type: DELETE_REVIEW,
//         review
//     }
// }

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
            action.reviews.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        }
        case LOAD_REVIEW:
            return { ...state, reviewDetail: {...action.review}};
        case UPDATE_REVIEW:
            return {...state, reviewDetail: action.review}
        default:
            return state;
    }
};

export default reviewReducer;
