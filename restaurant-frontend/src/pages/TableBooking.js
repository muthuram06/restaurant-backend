import React, {
  useState
} from "react";

import NavbarComponent
from "../components/NavbarComponent";

function TableBooking() {

  const [name, setName] =
    useState("");

  const [persons, setPersons] =
    useState(2);

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const bookTable = async () => {

    if (
      !name.trim() ||
      !date ||
      !time
    ) {

      alert("Please Fill All Details");
      return;

    }

    const bookingData = {

      customerName: name,
      persons,
      bookingDate: date,
      bookingTime: time

    };

    try {

      await fetch(
        "https://restaurant-backend-ca51.onrender.com/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(
            bookingData
          )
        }
      );

      alert(
        "✅ Table Booked Successfully"
      );

      setName("");
      setPersons(2);
      setDate("");
      setTime("");

    } catch (error) {

      console.log(error);

      alert(
        "Booking Failed"
      );

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#ecfccb,#d9f99d)"
      }}
    >

      <NavbarComponent />

      <div className="container py-5">

        <div className="row">

          <div className="col-lg-8">

            <div
              className="card border-0 shadow-lg p-4"
              style={{
                borderRadius:
                  "25px"
              }}
            >

              <h1
                className="text-center fw-bold mb-4"
              >
                🍽 Reserve Your Table
              </h1>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Customer Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

              <label className="fw-bold mb-2">
                Number Of Guests
              </label>

              <div className="d-flex align-items-center mb-4">

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    persons > 1 &&
                    setPersons(
                      persons - 1
                    )
                  }
                >
                  -
                </button>

                <h4 className="mx-4">

                  {persons}

                </h4>

                <button
                  className="btn btn-success"
                  onClick={() =>
                    setPersons(
                      persons + 1
                    )
                  }
                >
                  +
                </button>

              </div>

              <input
                type="date"
                className="form-control mb-3"
                value={date}
                onChange={(e) =>
                  setDate(
                    e.target.value
                  )
                }
              />

              <select
                className="form-control mb-4"
                value={time}
                onChange={(e) =>
                  setTime(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Time Slot
                </option>

                <option>
                  12:00 PM
                </option>

                <option>
                  01:00 PM
                </option>

                <option>
                  02:00 PM
                </option>

                <option>
                  06:00 PM
                </option>

                <option>
                  07:00 PM
                </option>

                <option>
                  08:00 PM
                </option>

                <option>
                  09:00 PM
                </option>

              </select>

              <button
                className="btn btn-success btn-lg w-100"
                onClick={bookTable}
              >
                Book Table
              </button>

            </div>

          </div>

          <div className="col-lg-4 mt-4 mt-lg-0">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius:
                  "25px"
              }}
            >

              <div className="card-body">

                <h3 className="fw-bold mb-3">

                  📋 Booking Summary

                </h3>

                <hr />

                <p>
                  👤 Customer :
                  {" "}
                  {name || "N/A"}
                </p>

                <p>
                  👥 Guests :
                  {" "}
                  {persons}
                </p>

                <p>
                  📅 Date :
                  {" "}
                  {date || "N/A"}
                </p>

                <p>
                  ⏰ Time :
                  {" "}
                  {time || "N/A"}
                </p>

              </div>

            </div>

            <div
              className="card border-0 shadow mt-4"
              style={{
                borderRadius:
                  "25px"
              }}
            >

              <div className="card-body">

                <h4>
                  ℹ Restaurant Rules
                </h4>

                <ul>

                  <li>
                    Arrive 10 minutes early
                  </li>

                  <li>
                    Booking held for 15 minutes
                  </li>

                  <li>
                    Outside food not allowed
                  </li>

                  <li>
                    Family friendly environment
                  </li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default TableBooking;