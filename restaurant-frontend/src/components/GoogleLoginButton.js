import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("Login Success:", credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleLoginButton;