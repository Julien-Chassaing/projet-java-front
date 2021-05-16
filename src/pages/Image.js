import React from "react";
import Logo from "../components/Logo";
import SelectedImage from "../components/SelectedImage";
import Navigation from "../components/Navigation";

const Image = () => {
  return (
    <div>
      <Navigation />
      <Logo />
      <SelectedImage />
    </div>
  );
};

export default Image;
