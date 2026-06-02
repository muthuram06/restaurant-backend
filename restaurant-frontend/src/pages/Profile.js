import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";

function Profile() {

  const [orders, setOrders] = useState([]);

  const email =
    localStorage.getItem("userEmail");

  useEffect(() => {

    if (email) {

      axios
        .get(
          `https://restaurant-backend-ca51.onrender.com/api/orders/user/${email}`
        )
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

    }

  }, [email]);

  const totalSpent =
    orders.reduce(
      (sum, order) =>
        sum + (order.total || 0),
      0
    );

  const user =
    orders.length > 0
      ? orders[0]
      : {};

  return (

    <div>

      <NavbarComponent />

      <div className="container py-5">

        <div
          className="card shadow-lg border-0 p-5"
          style={{
            borderRadius: "25px"
          }}
        >

          <div className="text-center">

            <h1 style={{ fontSize: "80px" }}>
              👤
            </h1>

            <h2 className="fw-bold">
              Customer Profile
            </h2>

            <hr />

          </div>

          <div className="row mt-4">

            <div className="col-md-6">

              <h5>
                Name :
                {" "}
                {user.customerName || "N/A"}
              </h5>

              <h5>
                Email :
                {" "}
                {user.email || "N/A"}
              </h5>

            </div>

            <div className="col-md-6">

              <h5>
                Phone :
                {" "}
                {user.phone || "N/A"}
              </h5>

              <h5>
                Address :
                {" "}
                {user.address || "N/A"}
              </h5>

            </div>

          </div>

          <hr />

          <div className="row text-center">

            <div className="col-md-6">

              <h3>
                📦 Orders
              </h3>

              <h1 className="text-primary">
                {orders.length}
              </h1>

            </div>

            <div className="col-md-6">

              <h3>
                💰 Total Spent
              </h3>

              <h1 className="text-success">
                ₹{totalSpent}
              </h1>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Profile;