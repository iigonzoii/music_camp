import { useEffect, useState} from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchAlbum } from "../../redux/albumReducer"
import MajorityDetails from "./MajorityDetails"
import AlbumAside from "./AlbumAside"
import "./AlbumDetails.css"

function AlbumDetails() {
    const { albumId } = useParams();
    const dispatch = useDispatch();
    let [isLoaded, setIsLoaded] = useState(false)
        useEffect(() => {
            dispatch(fetchAlbum(+albumId)).then(() =>
                setIsLoaded(true));
        }, [dispatch]);
    return isLoaded &&(
        <>
            <section className="ADsection1">
                <img className="ADbanner" src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampBackground.jpg?alt=media&token=df57940f-056e-468f-aae7-dfe860753847" />
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
