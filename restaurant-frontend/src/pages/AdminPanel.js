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

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#2563eb)",
        padding: "40px"
      }}
    >

      <div className="container">

        <h1
          className="text-center text-white fw-bold mb-5"
          style={{
            fontSize: "60px"
          }}
        >
          🍽 AFNA'S GARDEN
          <br />
          ADMIN CONTROL CENTER
        </h1>

        <div className="row g-4">

          <div className="col-md-3">

            <div className="card shadow-lg border-0">

              <div className="card-body text-center p-4">

                <h1>📅</h1>

                <h4>Bookings</h4>

                <button
                  className="btn btn-info w-100 mt-3"
                  onClick={() =>
                    navigate("/admin-bookings")
                  }
                >
                  View Bookings
                </button>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow-lg border-0">

              <div className="card-body text-center p-4">

                <h1>🍔</h1>

                <h4>Foods</h4>

                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={() =>
                    navigate("/admin-foods")
                  }
                >
                  Manage Foods
                </button>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow-lg border-0">

              <div className="card-body text-center p-4">

                <h1>📦</h1>

                <h4>Orders</h4>

                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={() =>
                    navigate("/admin-orders")
                  }
                >
                  View Orders
                </button>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow-lg border-0">

              <div className="card-body text-center p-4">

                <h1>📊</h1>

                <h4>Analytics</h4>

                <button
                  className="btn btn-warning w-100 mt-3"
                  onClick={() =>
                    navigate("/admin-analytics")
                  }
                >
                  View Analytics
                </button>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow-lg border-0">

              <div className="card-body text-center p-4">

                <h1>👥</h1>

                <h4>Customers</h4>

                <button
                  className="btn btn-dark w-100 mt-3"
                  onClick={() =>
                    navigate("/admin-customers")
                  }
                >
                  Customer Management
                </button>

              </div>

            </div>

          </div>

        </div>

        <div className="text-center mt-5">

          <button
            className="btn btn-danger btn-lg"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );
}

export default AdminPanel;