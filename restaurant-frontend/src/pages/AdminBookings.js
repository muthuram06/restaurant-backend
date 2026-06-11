import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function AdminBookings() {

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    loadBookings();

  }, []);

  const loadBookings =
    async () => {

      try {

        const response =
          await axios.get(
            "https://restaurant-backend-ca51.onrender.com/api/bookings"
          );

        setBookings(response.data);

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div className="container mt-5">

      <h1 className="text-center mb-4">

        📅 Table Reservations

      </h1>

      <div className="card shadow-lg">

        <div className="card-body">

          <table className="table table-hover">

            <thead className="table-dark">

              <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Guests</th>
                <th>Date</th>
                <th>Time</th>

              </tr>

            </thead>

            <tbody>

              {bookings.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No Bookings Found
                  </td>

                </tr>

              ) : (

                bookings.map(
                  (booking) => (

                    <tr key={booking.id}>

                      <td>
                        {booking.id}
                      </td>

                      <td>
                        {booking.customerName}
                      </td>

                      <td>
                        {booking.persons}
                      </td>

                      <td>
                        {booking.bookingDate}
                      </td>

                      <td>
                        {booking.bookingTime}
                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default AdminBookings;