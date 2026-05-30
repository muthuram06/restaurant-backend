import React from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("isAdminLoggedIn");

    navigate("/admin");
  };

  return (

    <div className="container mt-5">

      <h1 className="text-center mb-5">
        ADMIN DASHBOARD
      </h1>

      <div className="row">

        <div className="col-md-3">
          <div className="card shadow p-3">
            <h4>Food Management</h4>

            <button
              className="btn btn-primary mt-3"
              onClick={() =>
                navigate("/admin-foods")
              }
            >
              Manage Foods
            </button>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3">
            <h4>Orders</h4>

            <button
              className="btn btn-success mt-3"
              onClick={() =>
                navigate("/admin-orders")
              }
            >
              View Orders
            </button>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3">
            <h4>Analytics</h4>

            <button
              className="btn btn-warning mt-3"
              onClick={() =>
                navigate("/admin-analytics")
              }
            >
              Analytics
            </button>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3">
            <h4>Logout</h4>

            <button
              className="btn btn-danger mt-3"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

      </div>

    </div>

  );
}

export default AdminPanel;