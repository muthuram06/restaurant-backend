import React from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "isAdminLoggedIn"
    );

    navigate("/admin-login");
  };

  return (

    <div className="container mt-5">

      <h1 className="text-center mb-5">
        ADMIN DASHBOARD
      </h1>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow p-4">

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

        <div className="col-md-4">
          <div className="card shadow p-4">

            <h4>Orders Management</h4>

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

        <div className="col-md-4">
          <div className="card shadow p-4">

            <h4>Analytics</h4>

            <button
              className="btn btn-warning mt-3"
              onClick={() =>
                navigate("/admin-analytics")
              }
            >
              View Analytics
            </button>

          </div>
        </div>

      </div>

      <div className="text-center mt-5">

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default AdminPanel;