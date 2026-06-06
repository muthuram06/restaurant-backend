import React, {
  useEffect,
  useState
} from "react";

import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";

function Profile() {

  const [orders, setOrders] =
    useState([]);

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
      (order) =>
        order.status === "Delivered"
    ).length;

  const user =
    orders.length > 0
      ? orders[0]
      : {};

  const successRate =
    orders.length > 0
      ? (
          (deliveredOrders /
            orders.length) *
          100
        ).toFixed(0)
      : 0;

  const membership =
    totalSpent > 10000
      ? "👑 Platinum"
      : totalSpent > 5000
      ? "🥇 Gold"
      : "🥈 Silver";

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#dbeafe,#f0fdf4)"
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

          <div
            className="card-body p-5"
          >

            <div className="text-center">

              <div
                className="mx-auto d-flex align-items-center justify-content-center text-white fw-bold"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,#22c55e,#16a34a)",
                  fontSize: "48px"
                }}
              >

                {
                  user.customerName
                    ?.charAt(0)
                    ?.toUpperCase() || "U"
                }

              </div>

              <h2 className="fw-bold mt-3">

                {
                  user.customerName ||
                  "Customer"
                }

              </h2>

              <p className="text-muted">

                Welcome Back To
                AFNA'S GARDEN

              </p>

              <span className="badge bg-warning text-dark fs-6">

                {membership}

              </span>

            </div>

            <hr className="my-4" />

            <div className="row">

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
                  ⭐ Status :
                  Active Customer
                </h5>

              </div>

            </div>

            <div className="row mt-5">

              <div className="col-lg-3 col-md-6 mb-4">

                <div
                  className="card border-0 shadow text-center p-4"
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

              <div className="col-lg-3 col-md-6 mb-4">

                <div
                  className="card border-0 shadow text-center p-4"
                  style={{
                    borderRadius: "20px"
                  }}
                >

                  <h5>
                    💰 Spent
                  </h5>

                  <h1 className="text-success">

                    ₹{totalSpent}

                  </h1>

                </div>

              </div>

              <div className="col-lg-3 col-md-6 mb-4">

                <div
                  className="card border-0 shadow text-center p-4"
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

              <div className="col-lg-3 col-md-6 mb-4">

                <div
                  className="card border-0 shadow text-center p-4"
                  style={{
                    borderRadius: "20px"
                  }}
                >

                  <h5>
                    📈 Success
                  </h5>

                  <h1 className="text-info">

                    {successRate}%

                  </h1>

                </div>

              </div>

            </div>

            {orders.length > 0 && (

              <div
                className="card border-0 shadow mt-4"
              >

                <div className="card-body">

                  <h4 className="fw-bold">

                    🕒 Latest Order

                  </h4>

                  <hr />

                  <h5>

                    🍽 {
                      orders[
                        orders.length - 1
                      ].foodName
                    }

                  </h5>

                  <p>

                    Status :
                    {" "}
                    {
                      orders[
                        orders.length - 1
                      ].status
                    }

                  </p>

                  <h5 className="text-success">

                    ₹
                    {
                      orders[
                        orders.length - 1
                      ].total
                    }

                  </h5>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;