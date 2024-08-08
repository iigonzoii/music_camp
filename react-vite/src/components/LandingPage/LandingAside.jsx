import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchAlbum } from "../../redux/albumReducer"
import "./LandingPage.css"


function LandingAside() {
    let albumId = 2
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let album = useSelector(state => state.album);
    let [isLoaded, setIsLoaded] = useState(false)
    console.log("ALBUMS", album[albumId])
    useEffect(() => {
        dispatch(fetchAlbum(albumId)).then(() =>
            setIsLoaded(true));
    }, [dispatch]);
    // let duration = 0
    // for (let i = 0; i <= album.Album.tracks.length; i++) {
    //     duration = duration + album.Album.tracks[i][duration]
    // }
    // console.log("duration", duration)
    return (
        isLoaded && (
            <div>
                <div >album data div</div>

                <img className="LPasideimg" src={album[albumId].cover_image_url} />
                <div className="LPasideButtons">
                    <button onClick={() => navigate(`/albums/${albumId}`)}>Go to album</button>
                    <button>Wishlist</button>
                </div>

                <div>{`${album[albumId].tracks.length} Tracks`}</div>
                {/* idk how to get duration */}
                <div>{`Released ${album[albumId].created_at.split(" ")[2]} ${album[albumId].created_at.split(" ")[3]} `}</div>
                <div>
                    <img />
                    <p>image band name , city and country will go here</p>
                    <p>`Random Review` and random reviewer name will go here</p>
                </div>


            </div>
        )

    )
}

export default LandingAside
