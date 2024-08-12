import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal";
// import { useParams } from "react-router-dom"
import "./Reviews.css"


function ReviewCard({albumId}) {
    const sessionUser = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state.review.allReviews);
    // const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [albumReviews, setAlbumReviews] = useState([]);

    useEffect(() => {
        const filteredReviews = reviews.filter(review => review.albumId === albumId);
        setAlbumReviews(filteredReviews);
    }, [reviews, albumId]);


    return (
        <>
            {albumReviews.length === 0 && (
                <h2>Be the first to post a review!</h2>
            )}
            {albumReviews.map(({ id, review, User, createdAt }) => (
            // Need to figure out whether to join user to the fetch all route in backend or grab that info here
                <div key={id} className="review-card">
                    <div id="review-owner">
                        <h3>{User?.firstName}</h3>
                    </div>
                    <div id="review-date">
                        <h3>{new Date(createdAt).toDateString()}</h3>
                    </div>
                    <div id="review-text">
                        <p>{review}</p>
                    </div>
                        <div className="delete-review-button-container">
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteReviewModal reviewId={id} />}
                            />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default ReviewCard;
