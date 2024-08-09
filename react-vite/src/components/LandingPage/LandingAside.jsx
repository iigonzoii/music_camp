import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingAside({ data }) {
    const navigate = useNavigate();
    if (!data) {
        return <div>Loading...</div>;
    }
    console.log(data)
    return (
        <div>
            <div className="LPasideContainer">
                <img className="LPasideimg" src={data.cover_image_url} />
                <div className="LPasideButtons">
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

                <div>
                    <div>Reviews</div>
                    {data.reviews && data.reviews.length > 0 ? (
                        <ul>
                            {data.reviews.map((review) => (
                                <li key={review.id}>
                                    {" "}
                                    <strong>{review.review}</strong>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews available</p>
                    )}
                </div>
            </div>
        </div>
    );

}

export default LandingAside;
