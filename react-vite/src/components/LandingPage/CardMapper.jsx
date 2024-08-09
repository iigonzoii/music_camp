import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "./CardMapper.css"

function CardMapper() {
    const navigate = useNavigate();
    let albums = useSelector(state => state.album);
    albums = Object.values(albums)

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
