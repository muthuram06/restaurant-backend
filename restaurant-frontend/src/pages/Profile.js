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

  const userName =
    localStorage.getItem("userName");

  const userPicture =
    localStorage.getItem("userPicture");

  useEffect(() => {

    if (email) {

      axios
        .get(
          `https://restaurant-backend-ca51.onrender.com/api/orders/user/${email}`
        )
        .then((response) => {

          setOrders(
            response.data || []
          );

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

  const logout = () => {

    localStorage.clear();

    sessionStorage.clear();

    window.location.href =
      "/login";
  };

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

          <div className="card-body p-5">

            <div className="text-center">

              {userPicture ? (

                <img
                  src={userPicture}
                  alt="Profile"
                  style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border:
                      "5px solid #22c55e"
                  }}
                />

              ) : (

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
                    userName
                      ?.charAt(0)
                      ?.toUpperCase() || "U"
                  }
                </div>

              )}

              <h2 className="fw-bold mt-3">

                {
                  userName ||
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
                  {email || "N/A"}
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

                <div className="card shadow text-center p-4">

                  <h5>📦 Orders</h5>

                  <h1 className="text-primary">
                    {orders.length}
                  </h1>

                </div>

              </div>

              <div className="col-lg-3 col-md-6 mb-4">

                <div className="card shadow text-center p-4">

                  <h5>💰 Spent</h5>

                  <h1 className="text-success">
                    ₹{totalSpent}
                  </h1>

                </div>

              </div>

              <div className="col-lg-3 col-md-6 mb-4">

                <div className="card shadow text-center p-4">

                  <h5>🚚 Delivered</h5>

                  <h1 className="text-warning">
                    {deliveredOrders}
                  </h1>

                </div>

              </div>

              <div className="col-lg-3 col-md-6 mb-4">

                <div className="card shadow text-center p-4">

                  <h5>📈 Success</h5>

                  <h1 className="text-info">
                    {successRate}%
                  </h1>

                </div>

              </div>

            </div>

            <div className="card mt-4 shadow">

              <div className="card-body">

                <h4>
                  🕒 Recent Orders
                </h4>

                <table className="table">

                  <thead>

                    <tr>
                      <th>Food</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>

                  </thead>

                  <tbody>

                    {orders
                      .slice(-5)
                      .reverse()
                      .map((order) => (

                        <tr key={order.id}>

                          <td>
                            {order.foodName}
                          </td>

                          <td>
                            {order.status}
                          </td>

                          <td>
                            ₹{order.total}
                          </td>

                        </tr>

                      ))}

                  </tbody>

                </table>

              </div>

            </div>

            <div className="text-center mt-4">

              <button
                className="btn btn-danger btn-lg"
                onClick={logout}
              >
                🚪 Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;