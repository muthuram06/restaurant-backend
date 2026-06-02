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
            fontSize: "65px",
            letterSpacing: "2px"
          }}
        >
          🍽 AFNA'S GARDEN
          <br />
          ADMIN CONTROL CENTER
        </h1>

        <div className="row g-4 mb-5">

          <div className="col-md-3">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "20px"
              }}
            >

              <div className="card-body text-center p-4">

                <h1>🍔</h1>

                <h2>Foods</h2>

                <h3 className="text-primary">
                  23+
                </h3>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "20px"
              }}
            >

              <div className="card-body text-center p-4">

                <h1>📦</h1>

                <h2>Orders</h2>

                <h3 className="text-success">
                  Live
                </h3>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "20px"
              }}
            >

              <div className="card-body text-center p-4">

                <h1>💰</h1>

                <h2>Revenue</h2>

                <h3 className="text-warning">
                  Track
                </h3>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "20px"
              }}
            >

              <div className="card-body text-center p-4">

                <h1>⭐</h1>

                <h2>Status</h2>

                <h3 className="text-info">
                  Active
                </h3>

              </div>

            </div>

          </div>

        </div>

        <div className="row g-4">

          <div className="col-md-4">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "25px"
              }}
            >

              <div className="card-body text-center p-5">

                <h1 style={{ fontSize: "70px" }}>
                  🍔
                </h1>

                <h3>
                  Food Management
                </h3>

                <p>
                  Add, Edit and Delete Foods
                </p>

                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    navigate(
                      "/admin-foods"
                    )
                  }
                >
                  Manage Foods
                </button>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "25px"
              }}
            >

              <div className="card-body text-center p-5">

                <h1 style={{ fontSize: "70px" }}>
                  📦
                </h1>

                <h3>
                  Orders
                </h3>

                <p>
                  View Customer Orders
                </p>

                <button
                  className="btn btn-success w-100"
                  onClick={() =>
                    navigate(
                      "/admin-orders"
                    )
                  }
                >
                  View Orders
                </button>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "25px"
              }}
            >

              <div className="card-body text-center p-5">

                <h1 style={{ fontSize: "70px" }}>
                  📊
                </h1>

                <h3>
                  Analytics
                </h3>

                <p>
                  Revenue & Reports
                </p>

                <button
                  className="btn btn-warning w-100"
                  onClick={() =>
                    navigate(
                      "/admin-analytics"
                    )
                  }
                >
                  View Analytics
                </button>

              </div>

            </div>

          </div>

        </div>

        <div className="text-center mt-5">

          <button
            className="btn btn-danger btn-lg px-5"
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