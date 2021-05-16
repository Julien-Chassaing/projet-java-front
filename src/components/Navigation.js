import React from "react";
import { NavLink } from "react-router-dom";

function NavLogged() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user !== null) {
    if (user.role === 0) {
      return (
        <>
          <NavLink exact to="/" activeClassName="nav-active">
            Accueil
          </NavLink>
          <NavLink exact to="/signout" activeClassName="nav-active">
            Deconnexion
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink exact to="/" activeClassName="nav-active">
            Accueil
          </NavLink>
          <NavLink exact to="/myimages" activeClassName="nav-active">
            Mes Images
          </NavLink>
          <NavLink exact to="/upload" activeClassName="nav-active">
            Upload
          </NavLink>
          <NavLink exact to="/admin" activeClassName="nav-active">
            Admin
          </NavLink>
          <NavLink exact to="/signout" activeClassName="nav-active">
            Deconnexion
          </NavLink>
        </>
      );
    }
  } else {
    return (
      <>
        <NavLink exact to="/" activeClassName="nav-active">
          Accueil
        </NavLink>
        <NavLink exact to="/signin" activeClassName="nav-active">
          Connexion
        </NavLink>
      </>
    );
  }
}

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLogged />
    </div>
  );
};

export default Navigation;
