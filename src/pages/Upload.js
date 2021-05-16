import React, { useState } from "react";
import { Redirect } from "react-router";
import FormKeyword from "../components/FormKeyword";
import FormUpload from "../components/FormUpload";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const IsAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user !== null) {
    if (user.role === 0) {
      return (
        <>
          <Redirect to="/" />;
        </>
      );
    } else {
      return null;
    }
  } else {
    return (
      <>
        <Redirect to="/" />
      </>
    );
  }
};

const Upload = () => {
  const [upload, setUpload] = useState(false);
  const [dataImage, setDataImage] = useState([]);

  const checkUpload = (dataImage) => {
    setDataImage(dataImage);
    setUpload(true);
  };
  if (!upload) {
    return (
      <div>
        <IsAdmin />
        <Navigation />
        <Logo />
        <FormUpload checkUpload={(data) => checkUpload(data)} />
      </div>
    );
  } else {
    return (
      <div>
        <IsAdmin />
        <Navigation />
        <Logo />
        <FormKeyword dataImage={dataImage} />
      </div>
    );
  }
};

export default Upload;
