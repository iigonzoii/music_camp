import { useState } from 'react';
import { createReview } from '../../redux/reviews';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import "./ReviewForm.css"


function PostReviewModal({ albumId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [formData, setFormData] = useState({
      review: '',
      // stars:
  });
  const [errors, setErrors] = useState({});

  // console.log("Flag:", albumId, reviewDetail)
  // const starValues = [1, 2, 3, 4, 5];

  const handleSubmit = async (e) => {
      e.preventDefault();

      const serverResponse = await dispatch(
        createReview(albumId, formData)
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
      <div className="review-parent-container">
        <h1 className="review-form-heading">Share your review</h1>
          {errors.server && <p>{errors.server}</p>}
          <form className="review-form-body" onSubmit={handleSubmit}>
            <label>
              Review
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                required
              />
            </label>
            {errors.review && <p>{errors.review}</p>}
            <button className="submit-button" type="submit" disabled={formData.review.length < 2 }>Submit Your Review</button>
          </form>
      </div>
    )
}

export default PostReviewModal;
