import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingAside({ data }) {
    const navigate = useNavigate();

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="lp-aside-container">
                <img className="lp-aside-img" src={data.cover_image_url} />
                <div className="lp-aside-buttons">
                    <button onClick={() => navigate(`/albums/${+data.id}`)}>
                        Go to Album
                    </button>
                    <button>Wishlist</button>
                </div>
                <p>{data.band}</p>

                <div>Tracks</div>
                {data.tracks && data.tracks.length > 0 ? (
                    <ul>
                        {data.tracks.map((track) => (
                            <li key={track.id}>
                                {" "}
                                <strong>{track.name}</strong> - {track.duration}secs
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tracks available</p>
                )}

                    {data.reviews && data.reviews.length > 0 ? (
                        <div className="lp-reviews">
                            {data.reviews[0].review}

                        </div>
                    ) : (
                        <p>No reviews available</p>
                    )}

            </div>
        </div>
    );

}

export default LandingAside;
