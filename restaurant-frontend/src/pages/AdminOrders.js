import React, {
  useEffect,
  useState
} from "react";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    const storedOrders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    setOrders(storedOrders);

  }, []);

  const updateStatus = (
    index,
    status
  ) => {

    const updatedOrders =
      [...orders];

    updatedOrders[index].status =
      status;

    localStorage.setItem(

      "orders",

      JSON.stringify(updatedOrders)

    );

    setOrders(updatedOrders);
  };

  const deleteOrder = (index) => {

    const updatedOrders =
      orders.filter(

        (_, i) => i !== index
      );

    localStorage.setItem(

      "orders",

      JSON.stringify(updatedOrders)

    );

    setOrders(updatedOrders);
  };

  return (

    <div className="container mt-5">

      <h1 className="mb-4">
        Admin Orders Dashboard
      </h1>

      {orders.length === 0 ? (

        <div className="alert alert-warning">

          No Orders Available

        </div>

      ) : (

        orders.map((order, index) => (

          <div
            className="card p-4 mb-4 shadow"
            key={index}
          >

            <h3>
              User:
              {" "}
              {order.username || "Guest"}
            </h3>

            <h5>
              Status:
              {" "}

              <span className="text-primary">

                {order.status || "Preparing"}

              </span>
            </h5>

            <h4 className="text-success">

              ₹ {order.totalAmount}

            </h4>

            <div className="mt-3">

              <button
                className="btn btn-warning me-2"
                onClick={() =>
                  updateStatus(
                    index,
                    "Cooking"
                  )
                }
              >
                Cooking
              </button>

              <button
                className="btn btn-info me-2"
                onClick={() =>
                  updateStatus(
                    index,
                    "Out For Delivery"
                  )
                }
              >
                Delivery
              </button>

              <button
                className="btn btn-success me-2"
                onClick={() =>
                  updateStatus(
                    index,
                    "Delivered"
                  )
                }
              >
                Delivered
              </button>

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteOrder(index)
                }
              >
                Delete
              </button>

            </div>

            <hr />

            <h4>
              Ordered Foods
            </h4>

            {(order.items || []).map(

              (food, i) => (

                <div
                  key={i}
                  className="border p-2 mb-2"
                >

                  <h5>{food.name}</h5>

                  <p>
                    ₹ {food.price}
                  </p>

                </div>

              )

            )}

          </div>

        ))

      )}

    </div>
  );
}

export default AdminOrders;