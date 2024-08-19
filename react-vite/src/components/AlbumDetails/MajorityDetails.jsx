import { useSelector} from "react-redux"
import { useParams } from "react-router-dom"
import CartModal from "../CartModal/CartModal"
import "./AlbumDetails.css"
import ReviewButton from "../ReviewFormModal/ReviewButton";
import EditReviewModal from "../ReviewFormModal/EditReviewModal"
import DeleteReviewModal from "../ReviewFormModal/DeleteReviewModal"
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

function MajorityDetails() {
    const { albumId } = useParams()
    const sessionUser = useSelector((state) => state.session.user);
    let tracks = useSelector(state => state.track)
    let album = useSelector(state => state.album);
    let reviews = useSelector(state => state.review)
    reviews = Object.values(reviews)
    tracks = Object.values(tracks)

    // console.log("tracks", tracks)


    const albumProducts = album[albumId].Album.products
    const findProduct = (type) => {
        const product = albumProducts.find(product => product.type == type)
        return product
    }

    return (
        <>
            <div className="ad-album-data">
                <p>{album && album[albumId].Album.title}</p>
                <p>{`by ${album[albumId].Album.band}`}</p>
                <div className="V2-play">version2 play button and song</div>
                <p>{album[albumId].Album.description}</p>

                <div>
                    {sessionUser ? album && albumProducts.map((ptype, index) => (
                            <OpenModalButton key={index}
                                id='purchaseButton'
                                buttonText={`Buy ${ptype.type}`}
                                modalComponent={<CartModal albumData={findProduct(ptype.type)}/>}
                            />
                        // if no user is logged in
                        )) : album && albumProducts.map((ptype, index) => (
                            <OpenModalButton key={index}
                                id='purchaseButton'
                                buttonText={`Buy ${ptype.type}`}
                                modalComponent={<LoginFormModal />}
                            />
                        ))}
                </div>

                <ol className="ad-trackList">
                    {tracks.length > 0 ? tracks && tracks.map((track, index) => (
                        <li key={index}>
                            <i className="fa-regular fa-circle-play"></i>
                            {track.name} {track.duration}
                            </li>
                    )) : <p>No tracks yet</p>}
                    {/* {tracks && tracks.map((track, index) => (
                        <li key={index}>
                            <i className="fa-regular fa-circle-play"></i>
                            {track.name} {track.duration}
                            </li>
                    ))} */}
                </ol>
                <p>{`Produced by ${album[albumId].Album.producer}`}</p>
                <p>{`Released ${album[albumId].Album.created_at}`}</p>
            </div>

            <div className="ad-album-area">

                <img src={album[albumId].Album.cover_image_url} />

                <p><i className="fa-regular fa-heart pointer "></i>wishlist</p>
                <p>Supported by</p>
                <ul className="reviews-list">

                {reviews.length > 0 ? reviews && reviews.map((review, index) => (
                        <li key={index}>
                            {`UserId-${review.user_id}-${review.review}`}
                            {sessionUser && review.user_id === sessionUser.id && (
                                <div className="review-modify-buttons">
                                    <div className="review-edit-button">
                                        <OpenModalButton
                                            buttonText="EDIT"
                                            modalComponent={<EditReviewModal reviewId={review.id} review={review} />}
                                        />
                                    </div>
                                    <div className="review-delete-button">
                                        <OpenModalButton
                                            buttonText="DELETE"
                                            modalComponent={<DeleteReviewModal reviewId={review.id} />}
                                        />
                                    </div>
                                </div>
                            )}
                        </li>
                    )) : <p>No reviews here</p>}

                    {/* {reviews && reviews.map((review, index) => (
                        <li key={index}>
                            {`UserId-${review.user_id}-${review.review}`}
                            {sessionUser && review.user_id === sessionUser.id && (
                                <div className="review-modify-buttons">
                                    <div className="review-edit-button">
                                        <OpenModalButton
                                            buttonText="EDIT"
                                            modalComponent={<EditReviewModal reviewId={review.id} review={review} />}
                                        />
                                    </div>
                                    <div className="review-delete-button">
                                        <OpenModalButton
                                            buttonText="DELETE"
                                            modalComponent={<DeleteReviewModal reviewId={review.id} />}
                                        />
                                    </div>
                                </div>
                            )}
                        </li>
                    ))} */}

                    {/* <li>Version 2 probably make this box scroll and seethrough to show the background img?</li> */}
                </ul>
                {sessionUser && album[albumId].Album.user_id !== sessionUser.id && (
                    <div className="ad-review-button">
                        {(
                            <ReviewButton reviews={reviews} albumId={albumId} />
                        )}
                    </div>
                )}

                <div className="ad-v2-supporters">
                    Version2 where we showed a tiled list of supporters profile images
                </div>

            </div>
        </>
    )
}

export default MajorityDetails
