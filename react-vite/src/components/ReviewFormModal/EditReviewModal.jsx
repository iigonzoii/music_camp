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
        <>
          <h1 className="review-form-heading">Edit your review</h1>
          <div className="review-parent-container">
            {errors.server && <p>{errors.server}</p>}
              <form onSubmit={handleSubmit}>
                <label>
                  Review
                  <input
                    type="text"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    required
                  />
                </label>
                {errors.review && <p>{errors.review}</p>}
                <button className="submit-button" type="submit" >Submit Your Change</button>
              </form>
          </div>
        </>
    )
}

export default EditReviewModal;
