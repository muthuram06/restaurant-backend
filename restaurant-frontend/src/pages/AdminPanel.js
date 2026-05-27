import React, {
  useState
} from "react";

import AdminFoods
from "./AdminFoods";

import AdminOrders
from "./AdminOrders";

import AdminAnalytics
from "./AdminAnalytics";

function AdminPanel() {

  const [activePage,
    setActivePage] =
    useState("dashboard");

  const orders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || [];

  const foods =
    JSON.parse(
      localStorage.getItem("foods")
    ) || [];

  const users =
    JSON.parse(
      localStorage.getItem("users")
    ) || [];

  const revenue = orders.reduce(

    (total, order) =>

      total +
      (order.totalAmount || 0),

    0
  );

  return (

    <div>

      {/* TOP NAVBAR */}
      <nav className="navbar navbar-dark bg-dark px-4">

        <h2 className="text-white">

          ADMIN PANEL

        </h2>

        <div>

          <button
            className="btn btn-light mx-2"
            onClick={() =>
              setActivePage(
                "dashboard"
              )
            }
          >
            Dashboard
          </button>

          <button
            className="btn btn-success mx-2"
            onClick={() =>
              setActivePage(
                "foods"
              )
            }
          >
            Foods
          </button>

          <button
            className="btn btn-primary mx-2"
            onClick={() =>
              setActivePage(
                "orders"
              )
            }
          >
            Orders
          </button>

          <button
            className="btn btn-warning mx-2"
            onClick={() =>
              setActivePage(
                "analytics"
              )
            }
          >
            Analytics
          </button>

        </div>

      </nav>

      {/* DASHBOARD */}
      {activePage ===
        "dashboard" && (

        <div className="container mt-5">

          <h1 className="mb-5">

            Admin Dashboard

          </h1>

          <div className="row">

            <div className="col-md-3 mb-4">

              <div className="card bg-primary text-white shadow">

                <div className="card-body text-center">

                  <h1>

                    {orders.length}

                  </h1>

                  <h5>

                    Total Orders

                  </h5>

                </div>

              </div>

            </div>

            <div className="col-md-3 mb-4">

              <div className="card bg-success text-white shadow">

                <div className="card-body text-center">

                  <h1>

                    {foods.length}

                  </h1>

                  <h5>

                    Total Foods

                  </h5>

                </div>

              </div>

            </div>

            <div className="col-md-3 mb-4">

              <div className="card bg-warning shadow">

                <div className="card-body text-center">

                  <h1>

                    {users.length}

                  </h1>

                  <h5>

                    Users

                  </h5>

                </div>

              </div>

            </div>

            <div className="col-md-3 mb-4">

              <div className="card bg-danger text-white shadow">

                <div className="card-body text-center">

                  <h1>

                    ₹ {revenue}

                  </h1>

                  <h5>

                    Revenue

                  </h5>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* FOODS */}
      {activePage ===
        "foods" && (
        <AdminFoods />
      )}

      {/* ORDERS */}
      {activePage ===
        "orders" && (
        <AdminOrders />
      )}

      {/* ANALYTICS */}
      {activePage ===
        "analytics" && (
        <AdminAnalytics />
      )}

    </div>
  );
}

export default AdminPanel;