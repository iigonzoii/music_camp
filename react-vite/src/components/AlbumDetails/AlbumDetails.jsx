import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchAlbum } from "../../redux/albumReducer"
import { fetchReviewsByAlbum } from "../../redux/reviews"
import { fetchTracksbyAlbumId } from "../../redux/tracks"
import MajorityDetails from "./MajorityDetails"
import AlbumAside from "./AlbumAside"
// import { createCartKey } from "../../../prettier"
import "./AlbumDetails.css"

// todo fetch reviews using this album id
//* fetchreviews by id first passing in the param and then fetch album passing in same param, then setIsLoaded to true
// todo store the reviews to a variable
//* useSelector and then console log. we want an array and may have to do the object.values thing to get what we need but do this in the majority details component
//todo put albumId in the dependancy array


//todo get tracks to log in console from LOAD_TRACKS case in the reducer
//todo map tracks on majDetails
function AlbumDetails() {
    const { albumId } = useParams();
    const dispatch = useDispatch();
    // let review = useSelector(state => state.review)
    // review = Object.values(review)
    // console.log("UseReview", review)
    let tracks = useSelector(state => state.track)
    // console.log("UseTrack", tracks)
    console.log("YEET", Object.values(tracks))
    let album = useSelector(state => state.album);
    let [isLoaded, setIsLoaded] = useState(false)
    // useEffect(() => {
    //     dispatch(fetchTracksbyAlbumId(+albumId))
    //         .then(dispatch(fetchReviewsByAlbum(+albumId)))
    //         .then(() => dispatch(fetchAlbum(+albumId)))
    //         .then(() => setIsLoaded(true));
    // }, [dispatch, albumId]);
    useEffect(() => {
        dispatch(fetchReviewsByAlbum(+albumId))
        .then(() => dispatch(fetchAlbum(+albumId)))
        .then(() => dispatch(fetchTracksbyAlbumId(+albumId)))
        .then(() => setIsLoaded(true));
    }, [dispatch, albumId]);

    return isLoaded && (
        <>

            <section className="ADsection1">
                <img className="ADbanner" src={album[albumId].UserInfo[0].banner_img_url} />
            </section>

            <div className="ADcontainer">

                <section className="ADsection2">
                    <MajorityDetails />
                </section>
                <aside className="ADsection3">
                    <AlbumAside />
                </aside>

            </div>
        </>
    )
}


export default AlbumDetails
