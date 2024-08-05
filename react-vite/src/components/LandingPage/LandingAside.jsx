import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
import { fetchAlbums } from "../../redux/albumReducer"
// import { useNavigate } from "react-router-dom";
// import { fetchReviews } from "../../store/reviewReducer"

function LandingAside() {
    // const { albumId } = useParams()
    // const navigate = useNavigate();
    // console.log("albumIDDDDDD", albumId)
    const dispatch = useDispatch();
    let albums = useSelector(state => state.album);
    albums = Object.values(albums)
    console.log("ALBUMS", albums)

    // const session = useSelector(state => state.session);
    // console.log(album.albumDetail)
    // console.log("ALBUM", album)
    // let [isLoaded, setIsLoaded] = useState(false)
    // let review = useSelector(state => state.review)
    // review = Object.values(review).reverse()
    // console.log("REVIEWWWW", review)
    // let userHasReview
    // if (session.user !== null) userHasReview = review.find(currReview => currReview.userId === session.user.id)
    useEffect(() => {
        dispatch(fetchAlbums())
        // .then(() => dispatch(fetchSpot(+spotId)))
        // .then(() => setIsLoaded(true));
        //! if i get build errors then take this stupid spotId out of here
    }, [dispatch]);

    return (
        <div>
            {/* this works until you refresh. should be using the album by id thunk i think but idk  */}
            {/* <img className="LPasideimg" src={albums[2].cover_image_url} /> */}
            <div>album data div</div>
            <div>
                <button>Go to album</button>
                <button>Wishlist</button>
            </div>
            <div>number of tracks</div>
            <div>released `DATE`</div>
            <div>image band name , city and country will go here</div>
            <div>`Random Review` and random reviewer name will go here</div>

        </div>
    )
}

export default LandingAside
