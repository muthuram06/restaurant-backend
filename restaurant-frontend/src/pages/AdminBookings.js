import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://restaurant-backend-ca51.onrender.com/api/bookings"
      )
      .then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="container mt-4">

      <h2>Table Bookings</h2>

      <table className="table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Guests</th>
          </tr>
        </thead>

        <tbody>

          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.date}</td>
              <td>{b.guests}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminBookings;