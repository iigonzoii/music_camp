import { useSelector} from "react-redux"
import { useParams } from "react-router-dom"
import "./AlbumDetails.css"
import ReviewButton from "../ReviewFormModal/ReviewButton";
import EditReviewModal from "../ReviewFormModal/EditReviewModal"
import DeleteReviewModal from "../ReviewFormModal/DeleteReviewModal"
import OpenModalButton from "../OpenModalButton";

function MajorityDetails() {
    const { albumId } = useParams()
    const sessionUser = useSelector((state) => state.session.user);
    let tracks = useSelector(state => state.track)
    let album = useSelector(state => state.album);
    let reviews = useSelector(state => state.review)
    reviews = Object.values(reviews)
    tracks = Object.values(tracks)


    return (
        <>
            <div className="ADalbumData">
                <p>{album && album[albumId].Album.title}</p>
                <p>{`by ${album[albumId].Album.band}`}</p>
                <div className="V2Play">version2 play button and song</div>
                <p>{album[albumId].Album.description}</p>

                {album && album[albumId].Album.products.map((ptype, index) => (
                        <button key={index}>
                            {`Buy ${ptype.type}`}
                            </button>
                    ))}

                <ol className="ADtrackList">
                    {tracks && tracks.map((track, index) => (
                        <li key={index}>
                            <i className="fa-regular fa-circle-play"></i>
                            {track.name} {track.duration}
                            </li>
                    ))}
                </ol>
                <p>{`Produced by ${album[albumId].Album.producer}`}</p>
                <p>{`Released ${album[albumId].Album.created_at}`}</p>
            </div>

            <div className="ADalbumArea">

                <img src={album[albumId].Album.cover_image_url} />

                <p><i className="fa-regular fa-heart pointer "></i>wishlist</p>
                <p>Supported by</p>
                <ul>
                    {reviews && reviews.map((review, index) => (
                        <li key={index}>
                            {`UserId-${review.user_id}-${review.review}`}
                            {sessionUser && review.user_id === sessionUser.id && (
                                <>
                                    <OpenModalButton
                                        buttonText="Edit"
                                        modalComponent={<EditReviewModal reviewId={review.id} review={review} />}
                                    />
                                    <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeleteReviewModal review={review} albumId={albumId} />}
                                    />
                                </>
                            )}
                        </li>
                    ))}
                    <li>Version 2 probably make this box scroll and seethrough to show the background img?</li>
                </ul>
                <div className="AD-review-button">
                    {(
                        <ReviewButton reviews={reviews}/>
                    )}
                </div>
                <div className="ADv2supporters">
                    Version2 where we showed a tiled list of supporters profile images
                </div>

            </div>
        </>
    )
}

export default MajorityDetails
