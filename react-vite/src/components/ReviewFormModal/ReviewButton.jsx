import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import PostReviewModal from "./PostReviewModal"

function ReviewButton({reviews, albumId}) {
  const sessionUser = useSelector((state) => state.session.user);
  let album = useSelector(state => state.album);
  console.log("Flag:", album)
  // const { albumId } = useParams()
  // const albumId = album.id

  const userAlreadyReviewed = sessionUser && reviews ? reviews.some((review) => review.user_id === sessionUser.id): false;
  // console.log(userAlreadyReviewed)

  // const userAlbum = sessionUser && album ? album.artist_id !== sessionUser.id : true;

  return (
    <div className="review-button-container" >
      {sessionUser && !userAlreadyReviewed && (
        <OpenModalButton
          buttonText="Post a Review"
          modalComponent={<PostReviewModal albumId={albumId} />}
        />
      )}
    </div>
  );
}

export default ReviewButton;
