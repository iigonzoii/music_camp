import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import ProfileButton from "./ProfileButton";
// import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import CartItemsList from "../CartModal/CartItems";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((store) => store.session.user);
  const navigate = useNavigate()
  let albumData = useSelector((state) => state.album);
  albumData = Object.values(albumData)
  console.log("NAVABUM",albumData)

  return (
    <nav>
      <div>
        <NavLink to="/" className={"logo"}>Music Camp</NavLink>
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
        <i className="fa-regular fa-heart pointer heartIcon " ></i>
        <ProfileButton />
      </div>

    </nav>
  );
}

export default Navigation;
