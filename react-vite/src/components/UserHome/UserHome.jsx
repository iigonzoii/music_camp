import "./UserHome.css"
import { useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchOrders } from "../../redux/orderReducer"



function UserHome() {
    // const [user, setUser] = useState(null);
    const sessionUser = useSelector((state) => state.session.user);
    // let allOrders = useSelector(state => state.order);
    // let wishlist = useSelector(state => state.wishlist);
    const dispatch = useDispatch();

    let [isLoaded, setIsLoaded] = useState(false)
    let [showWishlist, setShowWishlist] = useState([])
        useEffect(() => {
            //incomplete purchase and wishlist dispatch stuff
            dispatch(fetchOrders()).then(() =>
                setIsLoaded(true));
        }, [dispatch]);


    return isLoaded && (
        <div>
            {/* className="UHcontainer" */}
            <section className="UHsection1">
                <img className="Profile-Image" src={`${sessionUser.artistImageUrl}`}/>
                <img className="UHmainImg" src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampUserProfileImg.jpg?alt=media&token=949d5249-d3c3-4e79-a385-4f3e0774c6bc"/>
                <div>{sessionUser.username}</div>
            </section>
            <section className="UHsection2">
                section2
            </section>
        </div>
    )
}

export default UserHome
