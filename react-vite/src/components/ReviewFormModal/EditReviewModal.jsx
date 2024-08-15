import { useState } from 'react';
import { editReview } from '../../redux/reviews';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
// import { useParams } from "react-router-dom"
import "./ReviewForm.css"


function EditReviewModal({ reviewId, review }) {
    // const { albumId } = useParams();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [formData, setFormData] = useState({
        review: review.review,
        // stars: review.stars,
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            editReview(reviewId, formData)
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
      <div className='review-form-parent'>
        <h1 className="review-form-heading">Edit your review</h1>
        {errors.server && <p>{errors.server}</p>}
          <form className="review-form-body" onSubmit={handleSubmit}>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                required
              />
            {errors.review && <p>{errors.review}</p>}
            <div className="review-buttons">
              <button className="submit-button" type="submit" >Submit</button>
              <button onClick={() => closeModal()} className="cancel-button">Cancel</button>
            </div>
          </form>
      </div>
    )
}

export default EditReviewModal;
