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

      const response =
        await axios.get(
          "https://restaurant-backend-ca51.onrender.com/api/bookings"
        );

      setBookings(response.data);
    };

  return (

    <div className="container mt-5">

      <h1 className="mb-4">

        Table Reservations

      </h1>

      <table className="table table-striped">

        <thead>

          <tr>

            <th>Name</th>
            <th>Guests</th>
            <th>Date</th>
            <th>Time</th>

          </tr>

        </thead>

        <tbody>

          {bookings.map(
            booking => (

              <tr key={booking.id}>

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
          )}

        </tbody>

      </table>

    </div>
  );
}

export default AdminBookings;