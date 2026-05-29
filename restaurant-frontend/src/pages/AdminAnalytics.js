import React from "react";

function AdminAnalytics() {

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum + (order.totalAmount || 0),
      0
    );

  return (

    <div className="container mt-5">

      <h1 className="mb-4">
        ADMIN ANALYTICS
      </h1>

      <div className="card p-4 shadow">

        <h3>
          Total Orders :
          {orders.length}
        </h3>

        <h3>
          Total Revenue :
          ₹{totalRevenue}
        </h3>

        <h3>
          Restaurant Status :
          Active
        </h3>

      </div>

    </div>

  );
}

export default AdminAnalytics;