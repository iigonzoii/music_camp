import "./UserHome.css"
import { useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"

function UserHome() {
    const [user, setUser] = useState(null);
    let purchases = useSelector(state => state.purchases); // no purchase or wishlist frontend routes yet
    let wishlist = useSelector(state => state.wishlist);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch();
    }, [])

    return (
        <div>
            {/* className="UHcontainer" */}
            <section className="UHsection1">
                <img className="Profile-Image" src={`${sessionUser.user.artistImageUrl}`}/>
                <img className="UHmainImg" src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampUserProfileImg.jpg?alt=media&token=949d5249-d3c3-4e79-a385-4f3e0774c6bc"/>
                <div>UserName</div>
            </section>
            <section className="UHsection2">
                section2
            </section>
        </div>
    )
}

export default UserHome
