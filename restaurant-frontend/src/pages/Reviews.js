import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

function Reviews({ foodName }) {

  const [reviews, setReviews] =
    useState([]);

  const [customerName,
    setCustomerName] =
    useState("");

  const [rating,
    setRating] =
    useState(5);

  const [comment,
    setComment] =
    useState("");

  const API_URL =
    "https://restaurant-backend-ca51.onrender.com/api/reviews";

  useEffect(() => {

    loadReviews();

  }, []);

  const loadReviews = () => {

    axios
      .get(
        `${API_URL}/${foodName}`
      )
      .then((response) => {

        setReviews(
          response.data
        );

      });

  };

  const submitReview = () => {

    axios
      .post(API_URL, {

        foodName,

        customerName,

        rating,

        comment

      })
      .then(() => {

        setCustomerName("");
        setComment("");

        loadReviews();

      });

  };

  return (

    <div className="card p-4 shadow mt-4">

      <h3>
        ⭐ Food Reviews
      </h3>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Your Name"
        value={customerName}
        onChange={(e) =>
          setCustomerName(
            e.target.value
          )
        }
      />

      <select
        className="form-control mb-2"
        value={rating}
        onChange={(e) =>
          setRating(
            e.target.value
          )
        }
      >
        <option value="5">
          ⭐⭐⭐⭐⭐
        </option>

        <option value="4">
          ⭐⭐⭐⭐
        </option>

        <option value="3">
          ⭐⭐⭐
        </option>

        <option value="2">
          ⭐⭐
        </option>

        <option value="1">
          ⭐
        </option>

      </select>

      <textarea
        className="form-control mb-3"
        placeholder="Review"
        value={comment}
        onChange={(e) =>
          setComment(
            e.target.value
          )
        }
      />

      <button
        className="btn btn-success"
        onClick={submitReview}
      >
        Submit Review
      </button>

      <hr />

      {reviews.map(
        (review) => (

          <div
            key={review.id}
            className="mb-3"
          >

            <h5>
              {review.customerName}
            </h5>

            <p>
              {"⭐".repeat(
                review.rating
              )}
            </p>

            <p>
              {review.comment}
            </p>

          </div>

        )
      )}

    </div>

  );
}

export default Reviews;