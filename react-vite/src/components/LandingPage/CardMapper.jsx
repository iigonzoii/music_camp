import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "./CardMapper.css"

function CardMapper({ genre, cat }) {
    const navigate = useNavigate();

    let albums = useSelector(state => state.album);
    albums = Object.values(albums);
    let filteredAlbums = albums



    function filterAlbums(genre, cat) {
        // Apply genre filter if genre is provided
        if (genre && genre !== "all-genres") {
            filteredAlbums = filteredAlbums.filter(album => album.genre === genre);
        }

        // Apply category filter if cat is provided
        if (cat && cat !== 'all-categories') {
            filteredAlbums = filteredAlbums
                .map(album => {
                    return {
                        ...album,
                        products: album.products.filter(
                            product => product.type === cat
                        )
                    };
                })
                .filter(album => album.products.length > 0);
        }

        return filteredAlbums;
    }

    albums = filterAlbums(genre, cat);

    // console.log(albums);

    return (
        <div className="cm-container">
            {albums && albums.map((album, index) => (
                <div className='pointer'
                    title={`${album.title}`}
                    onClick={() => navigate(`/albums/${album.id}`)}
                    key={index}>
                    <img className="cm-img" src={album.cover_image_url} alt={`${album.title} cover`} />
                    <div className="album-data-container">
                        <p className='data-container-item'>{album.title}</p>
                        <p className='data-container-item'>{`by ${album.band}`}</p>
                        <p className='data-container-item bottom-item'>{album.tags}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardMapper;
