import React from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {

  const navigate = useNavigate();

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  return (

    <div className="container mt-5">

      <h1 className="text-center mb-4">
        ADMIN DASHBOARD
      </h1>

      <div className="row">

        <div className="col-md-4">

          <div className="card shadow p-4">

            <h3>Total Orders</h3>

            <h1 className="text-success">
              {orders.length}
            </h1>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow p-4">

            <h3>Food Management</h3>

            <p>Add / Edit / Delete Foods</p>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow p-4">

            <h3>Admin Actions</h3>

            <button
              className="btn btn-primary mb-2"
              onClick={() =>
                navigate("/admin-orders")
              }
            >
              View Orders
            </button>

            <button
              className="btn btn-success"
              onClick={() =>
                navigate("/admin-analytics")
              }
            >
              Analytics
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AdminPanel;