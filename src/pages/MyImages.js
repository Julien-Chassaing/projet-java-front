import React from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import ImagesId from "../components/ImagesId";
import { Redirect } from "react-router";

const IsAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role === 0) {
    return (
      <>
        <Redirect to="/" />;
      </>
    );
  } else {
    return null;
  }
};

const MyImages = () => {
  return (
    <div>
      <IsAdmin />
      <Navigation />
      <Logo />
      <ImagesId />
    </div>
  );
};

export default MyImages;
