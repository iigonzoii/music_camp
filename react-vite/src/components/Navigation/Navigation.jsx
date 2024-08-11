import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((store) => store.session.user);

  // let navigate = useNavigate()
  return (
    <nav>
      <div>
        <NavLink to="/" className={"logo"}>Music Camp</NavLink>
        <input type="text" placeholder="Search"></input>
      </div>
      <div >
      {sessionUser && (
        <nav>
          <NavLink to={"/albums/new"}>Create Album</NavLink>
        </nav>
      )}
        <i className="fa-regular fa-heart pointer " ></i>
        <ProfileButton />
      </div>

    </nav>
  );
}

export default Navigation;
