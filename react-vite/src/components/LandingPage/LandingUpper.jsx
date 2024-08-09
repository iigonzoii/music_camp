import { useSelector} from "react-redux";
// useDispatch,
import "./LandingPage.css"

function LandingUpper() {
    // let dispatch = useDispatch()
    let albums = useSelector(state => state.album);
    albums = Object.values(albums)
    // console.log("ALBUMS",albums)
    function genreFilter(genre) {
        let result = albums.filter((album) => album.genre === genre)
        console.log("GfilterRes",result)
        return result
    }
    return (
        <div className="LPupperButtons">

        <div className="LPgenre">
            <button>All Genres</button>
            <button onClick={() => genreFilter("rock")}>Rock</button>
            <button onClick={() => genreFilter("hip-hop/rap")}>Hip-Hop/Rap</button>
            <button onClick={() => genreFilter("electronic")}>Electronic</button>
            <button onClick={() => genreFilter("jazz")}>Jazz</button>
        </div>
        <div className="LPcategory">
            <button>all categories</button>
            <button>Digital</button>
            <button>Vinyl</button>
            <button>Compact Discs</button>
            <button>Cassettes</button>
        </div>

    </div>
    )
}

export default LandingUpper
