import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function AdminCustomers() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    axios
      .get(
        "https://restaurant-backend-ca51.onrender.com/api/orders"
      )
      .then((response) => {

        setOrders(response.data);

      })
      .catch((error) => {

        console.error(error);

      });

  }, []);

  const customers = {};

  orders.forEach((order) => {

    if (!customers[order.email]) {

      customers[order.email] = {

        name:
          order.customerName,

        email:
          order.email,

        phone:
          order.phone,

        orders: 0,

        spent: 0

      };

    }

    customers[
      order.email
    ].orders++;

    customers[
      order.email
    ].spent +=
      order.total;

  });

  const customerList =
    Object.values(customers);

  return (

    <div className="container py-5">

      <h1 className="mb-5 fw-bold">

        👥 Customer Management

      </h1>

      <div className="card shadow border-0">

        <div className="card-body">

          <table className="table table-striped">

            <thead>

              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Phone</th>

                <th>Orders</th>

                <th>Total Spent</th>

              </tr>

            </thead>

            <tbody>

              {customerList.map(
                (
                  customer,
                  index
                ) => (

                  <tr
                    key={index}
                  >

                    <td>
                      {
                        customer.name
                      }
                    </td>

                    <td>
                      {
                        customer.email
                      }
                    </td>

                    <td>
                      {
                        customer.phone
                      }
                    </td>

                    <td>
                      {
                        customer.orders
                      }
                    </td>

                    <td>
                      ₹
                      {
                        customer.spent
                      }
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default AdminCustomers;