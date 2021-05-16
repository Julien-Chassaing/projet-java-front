import React from "react";
import { Redirect } from "react-router";

const SignOut = () => {
  return (
    <>
      {localStorage.clear()}
      <Redirect to="/" />
    </>
  );
};

export default SignOut;
