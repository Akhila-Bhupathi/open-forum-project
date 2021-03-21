import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import axios from "axios";

const GL = () => {
  const history = useHistory();
  const googleSuccess = (response) => {
    //  console.log(response);
    //  console.log(response.tokenObj.id_token);
    const tokenid = response.tokenObj.id_token;
    // localStorage.setItem("user_id",response.data.user_id);
    localStorage.setItem("token", response.tokenObj.id_token);
    // console.log(tokenid);

    localStorage.setItem("id", response.profileObj.googleId);
    localStorage.setItem("name", response.profileObj.name);
    localStorage.setItem("email", response.profileObj.email);
    localStorage.setItem("imageUrl", response.profileObj.imageUrl);

    axios
      .get("https://morning-temple-69567.herokuapp.com/auth/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenid,
        },
      })
      .then((response) => {
        // console.log(response);
        // console.log(response.data);     //http://localhost:5000
        localStorage.setItem("user_id", response.data.user_id);
        history.push("/home");

        //history.push('/home');
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const googleFailure = (response) => {
    console.log(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId="130831181306-gn9rouj8214vhp3qr7dju1dfe9e2bdbs.apps.googleusercontent.com"
        buttonText="Login with google"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GL;
