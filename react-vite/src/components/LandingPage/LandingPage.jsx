import "./LandingPage.css"
import CardMapper from "./CardMapper"
import LandingUpper from "./LandingUpper"
import LandingAside from "./LandingAside"
// import { useEffect } from 'react';

// import { fetchAlbums } from "../../redux/albumReducer"

// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import "./CardMapper.css"



function LandingPage() {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // // * going into the global state and accessing the spot slice of state from my combine reducer
    // let albums = useSelector(state => state.album);
    // // * turning that object into an array of spots
    // albums = Object.values(albums)
    // useEffect(() => {
    //     // * on load we dispatch fetchSpots thunk from our store/spots
    //     dispatch(fetchAlbums());
    // }, [dispatch]);

    return (
        <>
            <section className="LPsection1">
                <LandingUpper />
            </section>

            <div className="LPcontainer">

                <section className="LPsection2">section two, LEFT div will house the tiled list of albums and album data according to wireframe
                    <CardMapper />
                    {/* <div className="CMcontainer">
            {albums && albums.map((album, index) => (
                <div
                    title={`${album.title}`}
                    onClick={() => navigate(`/albums/${album.id}`)}
                    key={index}>
                    <img className="pointer" src={album.cover_image_url} />
                    <div className="spot-data-container">
                            <p>{album.title}</p>
                        <p>{`by ${album.band}`}</p>
                            <p>{(album.tags)}</p>
                            </div>
                </div>
            ))}
        </div> */}
                </section>

                <aside className="LPsection3">
                    <LandingAside />
                </aside>
            </div>
        </>
    )
}

export default LandingPage
