import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  // let navigate = useNavigate()
  return (
    <nav>
      <div>
        <NavLink to="/" className={"logo"}>Music Camp</NavLink>
        <input type="text" placeholder="Search"></input>
      </div>
      <div >
        <i className="fa-regular fa-heart pointer " ></i>
        <ProfileButton />
      </div>

    </nav>
  );
}

export default Navigation;
