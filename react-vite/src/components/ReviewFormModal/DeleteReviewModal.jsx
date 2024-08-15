import { useDispatch } from 'react-redux';
import { removeReview } from '../../redux/reviews';
import { useModal } from '../../context/Modal';


function DeleteReviewModal({reviewId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // console.log(reviewId);

    const handleDelete = async (e) => {
        e.preventDefault();
        return dispatch(removeReview(reviewId)).then(closeModal());
    };

    return (
        <div className="review-form-parent">
            <h1 className="review-form-heading">Confirm Delete</h1>
            <h2 id="delete-subheading">Are you sure you want to remove this review?</h2>
            <div className="review-buttons">
                <button className="cancel-button" type="submit" onClick={handleDelete}>Yes (Delete Review)</button>
                <button className="submit-button" onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal;
