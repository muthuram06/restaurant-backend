import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import jsPDF from "jspdf";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(storedOrders);
  }, []);

  const downloadBill = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(
      "AFNA'S GARDEN RESTAURANT",
      20,
      20
    );

    doc.setFontSize(14);
    doc.text(
      "Food Order Invoice",
      20,
      35
    );

    doc.line(20, 40, 190, 40);

    doc.text(
      "Customer Name : " + order.username,
      20,
      55
    );

    doc.text(
      "Phone : " + order.phone,
      20,
      65
    );

    doc.text(
      "Address : " + order.address,
      20,
      75
    );

    doc.text(
      "Order Date : " + order.orderDate,
      20,
      85
    );

    doc.text(
      "Payment Status : " + order.paymentStatus,
      20,
      95
    );

    doc.text(
      "Order Status : " + order.status,
      20,
      105
    );

    doc.text(
      "Total Amount : Rs." + order.totalAmount,
      20,
      115
    );

    let y = 130;

    doc.text(
      "Ordered Items",
      20,
      y
    );

    y += 10;

    order.items.forEach((food, index) => {
      doc.text(
        `${index + 1}. ${food.name} - Rs.${food.price} x ${food.quantity}`,
        20,
        y
      );

      y += 10;
    });

    doc.save("AFNAS_GARDEN_BILL.pdf");
  };

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
              <h4>
                Customer : {order.username}
              </h4>

              <h5>
                Phone : {order.phone}
              </h5>

              <h5>
                Address : {order.address}
              </h5>

              <h5>
                Order Date : {order.orderDate}
              </h5>

              <h5 className="text-primary">
                Payment Status : {order.paymentStatus}
              </h5>

              <h5 className="text-warning">
                Order Status : {order.status}
              </h5>

              <h4 className="text-success mt-3">
                Total Amount : ₹{order.totalAmount}
              </h4>

              <button
                className="btn btn-danger mb-4"
                onClick={() =>
                  downloadBill(order)
                }
              >
                Download Bill
              </button>

              <div className="row">
                {order.items &&
                  order.items.map((food, i) => (
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
                            objectFit: "cover"
                          }}
                        />

                        <div className="card-body">
                          <h4>
                            {food.name}
                          </h4>

                          <h5>
                            ₹{food.price}
                          </h5>

                          <h5>
                            Quantity : {food.quantity}
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