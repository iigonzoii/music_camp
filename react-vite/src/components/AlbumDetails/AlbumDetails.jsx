import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchAlbum } from "../../redux/albumReducer"
import { fetchReviewsByAlbum } from "../../redux/reviews"
import { fetchTracksbyAlbumId } from "../../redux/tracks"
import MajorityDetails from "./MajorityDetails"
import AlbumAside from "./AlbumAside"
import "./AlbumDetails.css"

function AlbumDetails() {
    const { albumId } = useParams();
    const dispatch = useDispatch();
    let album = useSelector(state => state.album);
    let [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchReviewsByAlbum(+albumId))
        .then(() => dispatch(fetchAlbum(+albumId)))
        .then(() => dispatch(fetchTracksbyAlbumId(+albumId)))
        .then(() => setIsLoaded(true));
    }, [dispatch, albumId]);

    return isLoaded && (
        <div className="margin">
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
        </div>
    )
}


export default AlbumDetails
