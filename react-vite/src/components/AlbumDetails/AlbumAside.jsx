import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchAlbum } from "../../redux/albumReducer"
import "./AlbumDetails.css"

function AlbumAside() {
    const { albumId } = useParams()
    const dispatch = useDispatch();
    let album = useSelector(state => state.album);
    let [isLoaded, setIsLoaded] = useState(false)
    // console.log("ALBUM", album)
    useEffect(() => {
        dispatch(fetchAlbum(+albumId)).then(() =>
            setIsLoaded(true));
    }, [dispatch, albumId]);
    // if (!album || !album.Album) return
    return isLoaded && (
        <>
        <div>
            {/* how to access users profile img */}
                        <img className="ADasideImg" src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampUserProfileImg.jpg?alt=media&token=949d5249-d3c3-4e79-a385-4f3e0774c6bc" />
                        {/* <div>Artist/Band Name</div> */}
                        <div>{album[albumId].band}</div>

                        <div>Artist City</div>
                        <div>Artist Country</div>
                    </div>
                    <div>
                    <div>Artist Website</div>
                    <div>Discography</div>

                    </div>
                    {album && album.UserAlbums.map((album, index) => (
                    <div key={index}>
                    <img className="ADasideDiscoImgs" src={album[albumId].cover_image_url}/>
                    <div>{album.title}</div>
                    <div>{`Released ${album[albumId].created_at.split(" ")[2]} ${album[albumId].created_at.split(" ")[3]} `}</div>

                </div>
                    ))}
        </>
    )
}

export default AlbumAside
