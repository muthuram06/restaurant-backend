import React, { useEffect, useState } from "react";

import NavbarComponent from "../components/NavbarComponent";
import jsPDF from "jspdf";

function Orders() {
   const downloadBill = () => {

    const doc = new jsPDF();

    doc.text(
      "AFNA'S GARDEN RESTAURANT",
     20,
      20
    );

    doc.text(
      "Thank You For Ordering",
      20,
      40
    );

    doc.save("bill.pdf");
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const currentUser =
      JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {

      const userOrders = storedOrders.filter(

        (order) =>
          order.email === currentUser.email
      );

      setOrders(userOrders);

    }

  }, []);

  return (

    <div>

      <NavbarComponent />

      <div className="container mt-5">

        <h1 className="mb-4">
          My Orders
        </h1>

        {orders.length === 0 ? (

          <h3 className="text-danger">
            No Orders Found
          </h3>

        ) : (

          orders.map((order, index) => (

            <div
              className="card shadow mb-4 p-4"
              key={index}
            >

              <h3>
                Ordered Time :
                {order.orderedTime}
              </h3>

              <h4 className="mt-3">

                Total Amount :
                ₹ {order.totalAmount}

              </h4>

              <h4 className="mt-3">

                Delivery Address :
                {order.address}

              </h4>

              <h4 className="mt-3">

                Phone :
                {order.phone}

              </h4>

              <h3 className="mt-4">

                Order Status :

                <span
                  className={
                    order.status === "Delivered"
                      ? "text-success"
                      : "text-primary"
                  }
                >
                  {" "}
                  {order.status}
                </span>

              </h3>

              <hr />

              <h3 className="mb-3">
                Ordered Foods
              </h3>

              <div className="row">

                {order.items.map((food, i) => (

                  <div
                    className="col-md-4"
                    key={i}
                  >

                    <div className="card mb-3">

                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="card-img-top"
                        style={{
                          height: "220px",
                          objectFit: "cover",
                        }}
                      />

                      <button
                        className="btn btn-danger"
                        onClick={downloadBill}
                      >
                        Download Bill
                      </button>

                      <div className="card-body">

                        <h4>{food.name}</h4>

                        <h5>
                          ₹ {food.price}
                        </h5>

                        <h5>
                          Quantity :
                          {food.quantity}
                        </h5>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Orders;