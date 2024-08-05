import { useEffect } from 'react';

import { fetchAlbums } from "../../redux/albumReducer"

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "./CardMapper.css"

function CardMapper() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // * going into the global state and accessing the spot slice of state from my combine reducer
    let albums = useSelector(state => state.album);
    // * turning that object into an array of spots
    albums = Object.values(albums)
    useEffect(() => {
        // * on load we dispatch fetchSpots thunk from our store/spots
        dispatch(fetchAlbums());
    }, [dispatch]);
    // let checkAvg = (rating) => {
    //     if (isNaN(rating)) {
    //         return "New"
    //     } else {
    //         return rating
    //     }
    // }

    return (
        <div className="CMcontainer">
            {albums && albums.map((album, index) => (
                <div
                    title={`${album.title}`}
                    onClick={() => navigate(`/albums/${album.id}`)}
                    key={index}>
                    <img className="CMImg" src={album.cover_image_url} />
                    <div className="spot-data-container">
                            <p>{album.title}</p>
                        <p>{`by ${album.band}`}</p>
                            <p>{(album.tags)}</p>
                            </div>
                </div>
            ))}
        </div>
    )
}

export default CardMapper
