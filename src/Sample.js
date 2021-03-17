import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
const Sample = () => {

    const googleSuccess=(response)=>{

        var data = {
            "google_id": response.profileObj.googleId,
            "name": response.profileObj.name,
            "email": response.profileObj.email,
            "tumbnail": response.profileObj.imageUrl
          }


        axios.post('https://floating-ridge-28249.herokuapp.com/auth/login', JSON.stringify(data), {
            headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
            }
   })
   .then((response) => {
     console.log(response);
   })
   .catch((error) => {
     console.log(error);
   })

    }

    const googleFailure=(response)=>{
        console.log(response);
    };

    return (
        <div>
            <GoogleLogin
          clientId="130831181306-gn9rouj8214vhp3qr7dju1dfe9e2bdbs.apps.googleusercontent.com" 
          buttonText="Login with google"
          
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={'single_host_origin'}
      />
        </div>
    )
}

export default Sample
