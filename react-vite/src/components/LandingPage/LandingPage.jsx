import "./LandingPage.css"
import CardMapper from "./CardMapper"
// import { useEffect } from 'react';
// import { fetchSpots } from "../../store/spotReducer"
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";


function LandingPage() {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // * going into the global state and accessing the spot slice of state from my combine reducer
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

    return (
        <>
            <div className="LPsection1">section one, TOP div will house the genre and categories tabs according to wireframe </div>

            <div className="LPcontainer">
                
                <div className="LPsection2">section two, LEFT div will house the tiled list of albums and album data according to wireframe
                <CardMapper />
                </div>

                <div className="LPsection3">section three, RIGHT div will house the tiled list of albums and album data according to wireframe </div>

            </div>
        </>
    )
}

export default LandingPage
