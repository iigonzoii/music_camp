// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "./CardMapper.css"

function CardMapper({genre, cat}) {
    const navigate = useNavigate();
    let albums = useSelector(state => state.album);
    albums = Object.values(albums)
    function genreFilter(genre) {
        if (genre === "all-genres") return albums
        let result = albums.filter((album) => album.genre === genre)
        return result
    }
    function catFilter(cat) {
        if (cat === "all-categories") return albums
        let result = albums.filter((album) => album.product_types.type === cat)
        return result
    }
    albums = genreFilter(genre)
    // albums = catFilter(cat)
    let categories = catFilter(cat)

    return (
        <div className="CMcontainer">
            {albums && albums.map((album, index) => (
                <div className='pointer'
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
