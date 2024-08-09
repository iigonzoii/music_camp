
//*------ACTION TYPES---------
const LOAD_REVIEWS = "reviews/loadReviews"
// const LOAD_REVIEW = "reviews/loadReview"
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

export const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

//*---------THUNKS------------

//* Get current users reviews
export const fetchCurrUserReviews = () => async (dispatch) => {
    const response = await csrfFetch("/api/reviews/current")
    // csrfFetch
    const reviews = await response.json()
    dispatch(loadReviews(reviews.Reviews))
}

//* Get all reviews by Album ID
export const fetchReviewsByAlbum = (albumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${albumId}/reviews`)
    const reviews = await response.json()
    dispatch(loadReviews(reviews))
}

//* Create a review by Album ID
export const createReview = (albumId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}/reviews`, {
        method: "POST",
        body: JSON.stringify(review),
        headers: { "Content-Type": "application/json" }
    })
    const newReview = await response.json()
    dispatch(addReview(newReview))
    return newReview
}

//* Update a review by ID
export const editReview = (reviewId, review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'Put',
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const updatedReview = await response.json()
        dispatch(updateReview(updatedReview))
        return updatedReview
    } else {
        const errors = await response.json()
        return errors
    }
}

//* Delete a review by id
export const removeReview = (reviewId) => async (dispatch) =>{
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })
    dispatch(deleteReview(reviewId))
    return response
}


//*---------REDUCERS-----------

const initialState = {
    allReviews: {},
    reviewDetail: {}
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = { ...state, allReviews: {} };
            action.reviews.forEach((review) => {
                newState.allReviews[review.id] = review
            });
            return newState;
        }
        // case LOAD_REVIEW:
        //     return { ...state, reviewDetail: {...action.review}};
        case ADD_REVIEW: {
            return {
                ...state,
                allReviews:{ ...state.allReviews, [action.review.id]: action.review },
            };
        };
        case UPDATE_REVIEW:
            return { ...state, allReviews: {...state.allReviews, [action.review.id]: action.review }}
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState.allReviews[action.reviewId];
            return newState;
        }
        default:
            return state;
    }
};

export default reviewReducer;