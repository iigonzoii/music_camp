// import { useEffect } from 'react';

// // import { fetchSpots } from "../../store/spotReducer"

// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
import "./CardMapper.css"

function CardMapper() {

    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // // * going into the global state and accessing the spot slice of state from my combine reducer
    // let spots = useSelector(state => state.spot);
    // // * turning that object into an array of spots
    // spots = Object.values(spots)
    // useEffect(() => {
    //     // * on load we dispatch fetchSpots thunk from our store/spots
    //     dispatch(fetchSpots());
    // }, [dispatch]);
    // let checkAvg = (rating) => {
    //     if (isNaN(rating)) {
    //         return "New"
    //     } else {
    //         return rating
    //     }
    // }
// * can probably delete div on line 30, we are pulling this into another component
    // return (
    //     <div className="root-container">
    //     <div className="CMcontainer">
    //         {spots && spots.map((spot, index) => (
    //             <div
    //                 title={`${spot.name}`}
    //                 onClick={() => navigate(`/spots/${spot.id}`)}
    //                 className="spot-card-container" key={index}>
    //                 <img className="pointer" src={spot.previewImage} />
    //                 <div className="spot-data-container">
    //                         <p className="cityState">{`${spot.city}, ${spot.state}`}</p>
    //                         {/* <p className="starRating starrr"><i className="fa-solid fa-star"></i>{`${checkAvg(spot.avgRating)}`}</p> */}
    //                         </div>
    //                     <p className="price">{`$${spot.price}night`}</p>
    //             </div>
    //         ))}
    //     </div>
    //     </div>
    // )
}

export default CardMapper
