import jwt_decode from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const GoogleLoginPage = () => {
  const GOOGLE_CLIENT_ID = "450717577604-0fmr7vtconoiv2tmhuj9brqm6kmv8ks8.apps.googleusercontent.com";
  const jwt_decode = require("jwt-decode");

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            const decodedToken = jwt_decode(credentialResponse.credential);
            console.log("Decoded Token:", decodedToken);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginPage;
