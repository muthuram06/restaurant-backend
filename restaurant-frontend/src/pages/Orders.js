import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);

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

  return (
    <div>

      <NavbarComponent />

      <div className="container mt-5">

        <h1 className="mb-4">
          My Orders
        </h1>

        {orders.length === 0 ? (

          <div className="alert alert-warning">
            No Orders Found
          </div>

        ) : (

          orders.map((order) => (

            <div
              key={order.id}
              className="card p-4 mb-4 shadow"
            >

              <h4>
                Customer :
                {" "}
                {order.customerName}
              </h4>

              <h5>
                Food :
                {" "}
                {order.foodName}
              </h5>

              <h5>
                Quantity :
                {" "}
                {order.quantity}
              </h5>

              <h5>
                Price :
                ₹{order.price}
              </h5>

              <h4 className="text-success">
                Total :
                ₹{order.total}
              </h4>

              <h5>
                Status :
                {" "}
                <span className="text-primary">
                  {order.status}
                </span>
              </h5>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Orders;