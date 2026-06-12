import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { useNavigate }
from "react-router-dom";

function AdminPanel() {

  const navigate = useNavigate();

  const [newOrders,
    setNewOrders] =
    useState(0);

  const [lastOrderId,
    setLastOrderId] =
    useState(
      localStorage.getItem(
        "lastOrderId"
      ) || 0
    );

  useEffect(() => {

    const interval =
      setInterval(() => {

        checkNewOrders();

      }, 5000);

    checkNewOrders();

    return () =>
      clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkNewOrders =
    async () => {

      try {

        const response =
          await axios.get(
            "https://restaurant-backend-ca51.onrender.com/api/orders/latest"
          );

        const latestOrder =
          response.data;

        if (
          latestOrder &&
          latestOrder.id >
          Number(lastOrderId)
        ) {

          setNewOrders(
            (prev) => prev + 1
          );

          localStorage.setItem(
            "lastOrderId",
            latestOrder.id
          );

          setLastOrderId(
            latestOrder.id
          );

          const audio =
            new Audio(
              "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
            );

          audio.play();

          alert(
            `🔔 New Order Received

Customer : ${latestOrder.customerName}

Food : ${latestOrder.foodName}

Total : ₹${latestOrder.total}`
          );
        }

      } catch (error) {

        console.log(error);

      }

    };

  const logout = () => {

    localStorage.removeItem(
      "isAdminLoggedIn"
    );

    navigate(
      "/admin-login"
    );
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

        <div className="d-flex justify-content-between align-items-center mb-5">

          <h1
            className="text-white fw-bold"
          >
            🍽 AFNA'S GARDEN
            <br />
            ADMIN CONTROL CENTER
          </h1>

          <button
            className="btn btn-warning position-relative"
          >
            🔔 Notifications

            {newOrders > 0 && (

              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {newOrders}
              </span>

            )}

          </button>

        </div>

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