import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchAlbum } from "../../redux/albumReducer"
// import { fetchReviews } from "../../store/reviewReducer"
import "./AlbumDetails.css"

function MajorityDetails() {
    const { albumId } = useParams()
    console.log("ALBUMIDDDDDD", albumId)
    const dispatch = useDispatch();
    let album = useSelector(state => state.album.albumDetail);
    console.log("ALBUM", album)
    let [isLoaded, setIsLoaded] = useState(false)
    // album = Object.values(album)
    // let reserve = () => alert("Feature coming soon")
    // let [isLoaded, setIsLoaded] = useState(false)
    // let review = useSelector(state => state.review)
    // review = Object.values(review).reverse()
    // console.log("REVIEWWWW", review)
    // let userHasReview
    // if (session.user !== null) userHasReview = review.find(currReview => currReview.userId === session.user.id)

    // useEffect(() => {
    //     dispatch(fetchReviews(+spotId))
    //         .then(() => dispatch(fetchSpot(+spotId)))
    //         .then(() => setIsLoaded(true));
    //     //! if i get build errors then take this stupid spotId out of here
    // }, [dispatch, spotId]);
    useEffect(() => {
        dispatch(fetchAlbum(+albumId)).then(() =>
            setIsLoaded(true));
    }, [dispatch]);
    if (!album || !album.Album) return
    return isLoaded && (

        <>
            <div className="ADalbumData">
                sub container left
                {console.log("albumInReturn", album)}
                <p>{album && album.Album.title}</p>
                <p>{`by ${album.Album.band}`}</p>
                <div className="V2Play">version2 play button and song</div>
                <p>{album.Album.product_type}</p>
                <button>{`Buy ${album.Album.product_type} album`}</button>
                <p>{album.Album.description}</p>

                <ol className="ADtrackList">
                    {/* idk how to get this working */}
                    <li>trackname track duration</li>
                    <li>trackname track duration</li>
                    <li>trackname track duration</li>
                </ol>
                <p>{`Produced by ${album.Album.producer}`}</p>
                <p>{`Released ${album.Album.created_at}`}</p>
            </div>

            <div className="ADalbumArea">

                <img src={album.Album.cover_image_url} />

                <p><i className="fa-regular fa-heart pointer "></i>wishlist</p>
                <p>Supported by</p>
                <ul>
                    <li>reviewer profile image and their review</li>
                    <li>reviewer profile image and their review</li>
                    <li>reviewer profile image and their review</li>
                    <li>reviewer profile image and their review</li>
                    <li>Version 2 probably make this box scroll and seethrough to show the background img?</li>
                </ul>
                <div className="ADv2supporters">
                    Version2 where we showed a tiled list of supporters profile images
                </div>

            </div>
        </>
    )
}

export default MajorityDetails
