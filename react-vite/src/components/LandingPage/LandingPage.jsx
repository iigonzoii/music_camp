import { useEffect } from 'react';
import { fetchAlbums } from "../../redux/albumReducer"
import { useDispatch } from 'react-redux';
import "./LandingPage.css"
import CardMapper from "./CardMapper"
import LandingUpper from "./LandingUpper"
import LandingAside from "./LandingAside"

function LandingPage() {
    const dispatch = useDispatch();
    // * going into the global state and accessing the spot slice of state from my combine reducer
    useEffect(() => {
        // * on load we dispatch fetchSpots thunk from our store/spots
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <>
            <section className="LPsection1">
                <LandingUpper />
            </section>

            <div className="LPcontainer">

                <section className="LPsection2">
                    <CardMapper />
                </section>

                <aside className="LPsection3">
                    <LandingAside />
                </aside>
            </div>
        </>
    )
}

export default LandingPage
