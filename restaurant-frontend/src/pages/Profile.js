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

  const deliveredOrders =
    orders.filter(
      (o) => o.status === "Delivered"
    ).length;

  const user =
    orders.length > 0
      ? orders[0]
      : {};

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#e0f7fa,#80deea)"
      }}
    >

      <NavbarComponent />

      <div className="container py-5">

        <div
          className="card border-0 shadow-lg"
          style={{
            borderRadius: "30px"
          }}
        >

          <div className="card-body p-5">

            <div className="text-center">

              <div
                style={{
                  fontSize: "90px"
                }}
              >
                👤
              </div>

              <h2 className="fw-bold">
                {user.customerName || "Customer"}
              </h2>

              <p className="text-muted">
                Welcome to AFNA'S GARDEN
              </p>

            </div>

            <hr />

            <div className="row mt-4">

              <div className="col-md-6">

                <h5>
                  📧 Email :
                  {" "}
                  {user.email || "N/A"}
                </h5>

                <h5>
                  📱 Phone :
                  {" "}
                  {user.phone || "N/A"}
                </h5>

              </div>

              <div className="col-md-6">

                <h5>
                  📍 Address :
                  {" "}
                  {user.address || "N/A"}
                </h5>

                <h5>
                  ⭐ Member :
                  Regular Customer
                </h5>

              </div>

            </div>

            <div className="row text-center mt-5">

              <div className="col-md-4 mb-3">

                <div
                  className="card border-0 shadow p-4"
                  style={{
                    borderRadius: "20px"
                  }}
                >

                  <h5>
                    📦 Orders
                  </h5>

                  <h1 className="text-primary">
                    {orders.length}
                  </h1>

                </div>

              </div>

              <div className="col-md-4 mb-3">

                <div
                  className="card border-0 shadow p-4"
                  style={{
                    borderRadius: "20px"
                  }}
                >

                  <h5>
                    💰 Total Spent
                  </h5>

                  <h1 className="text-success">
                    ₹{totalSpent}
                  </h1>

                </div>

              </div>

              <div className="col-md-4 mb-3">

                <div
                  className="card border-0 shadow p-4"
                  style={{
                    borderRadius: "20px"
                  }}
                >

                  <h5>
                    🚚 Delivered
                  </h5>

                  <h1 className="text-warning">
                    {deliveredOrders}
                  </h1>

                </div>

              </div>

            </div>

            <div className="text-center mt-4">

              <button className="btn btn-primary btn-lg">
                Edit Profile
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Profile;