import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <div>
        <NavLink to="/" className={"logo"}>Music Camp</NavLink>
      </div>

      <div>
        <ProfileButton />
      </div>

    </nav>
  );
}

export default Navigation;
