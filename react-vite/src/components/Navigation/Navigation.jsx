import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

// import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import CartItemsList from "../CartModal/CartItems";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((store) => store.session.user);
  const navigate = useNavigate()
  return (
    <nav>
      <div className="nav-container">
        {/* <NavLink to="/" className={"logo"}>Music Camp</NavLink> */}
        <NavLink className={"logo"} to="/">
          <img className="nav-app-logo" src="../../../public/images/mc-logo.png" alt="Logo" />
        </NavLink>
        <input className="navSearch" type="text" placeholder="Search"></input>
      </div>


      <div className="navRight" >
      {sessionUser && (
        <>
          <div>
            <NavLink className="createAlbum" to={"/albums/new"}>Create Album</NavLink>
          </div>
          <div>
          <NavLink className="createAlbum" to={"/home"}>My Music</NavLink>
          </div>
        </>
      )}
      <i className="fa-solid fa-cart-shopping pointer cartIcon"
        // onClick={OpenModalButton}
        onClick={() => navigate(`/shoppingCart`)}
      >
      </i>
          <i className="fa-regular fa-heart pointer heartIcon"/>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
