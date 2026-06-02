import React from "react";
import NavbarComponent from "../components/NavbarComponent";

function Profile() {

  const email =
    localStorage.getItem("userEmail");

  return (

    <div>

      <NavbarComponent />

      <div className="container mt-5">

        <div
          className="card shadow-lg border-0 p-5"
          style={{
            borderRadius: "20px"
          }}
        >

          <div className="text-center">

            <h1>👤</h1>

            <h2>My Profile</h2>

            <hr />

            <h5>
              Email :
              {" "}
              {email}
            </h5>

            <h5>
              Role :
              Customer
            </h5>

            <h5>
              Restaurant :
              AFNA'S GARDEN
            </h5>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Profile;