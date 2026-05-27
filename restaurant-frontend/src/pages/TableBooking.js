import React, {
  useState
} from "react";

import NavbarComponent
from "../components/NavbarComponent";

function TableBooking() {

  const [name, setName] =
    useState("");

  const [persons, setPersons] =
    useState(1);

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const bookTable = () => {

    if (
      !name ||
      !persons ||
      !date ||
      !time
    ) {

      alert(
        "Please Fill All Details"
      );

      return;
    }

    const bookingData = {

      customerName: name,
      persons: persons,
      bookingDate: date,
      bookingTime: time

    };

    const existingBookings =
      JSON.parse(
        localStorage.getItem(
          "tableBookings"
        )
      ) || [];

    existingBookings.push(
      bookingData
    );

    localStorage.setItem(
      "tableBookings",
      JSON.stringify(
        existingBookings
      )
    );

    alert(

      `Table Successfully Booked

Customer: ${name}

Persons: ${persons}

Date: ${date}

Time: ${time}`

    );

    setName("");
    setPersons(1);
    setDate("");
    setTime("");
  };

  return (

    <div>

      <NavbarComponent />

      <div className="container mt-5">

        <div className="card shadow p-4">

          <h1 className="mb-4 text-center">

            Veg Restaurant Table Booking

          </h1>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Customer Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="No Of Persons"
            value={persons}
            onChange={(e) =>
              setPersons(e.target.value)
            }
          />

          <input
            type="date"
            className="form-control mb-3"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

          <input
            type="time"
            className="form-control mb-4"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
          />

          <button
            className="btn btn-success w-100"
            onClick={bookTable}
          >

            Book Table

          </button>

        </div>

      </div>

    </div>
  );
}

export default TableBooking;