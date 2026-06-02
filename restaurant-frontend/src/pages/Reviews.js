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

  const loadReviews = () => {

    axios
      .get(
        `${API_URL}/${foodName}`
      )
      .then((response) => {

        setReviews(
          response.data
        );

      })
      .catch((error) => {

        console.error(error);

      });

  };

  useEffect(() => {

    if (foodName) {

      loadReviews();

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodName]);

  const submitReview = () => {

    if (!customerName.trim()) {

      alert(
        "Please enter your name"
      );

      return;
    }

    if (!comment.trim()) {

      alert(
        "Please enter review"
      );

      return;
    }

    axios
      .post(API_URL, {

        foodName,

        customerName,

        rating: Number(rating),

        comment

      })
      .then(() => {

        setCustomerName("");
        setComment("");
        setRating(5);

        loadReviews();

        alert(
          "Review Submitted Successfully"
        );

      })
      .catch((error) => {

        console.error(error);

        alert(
          "Failed to submit review"
        );

      });

  };

  return (

    <div
      className="card shadow-lg border-0 p-4 mt-5"
      style={{
        borderRadius: "20px"
      }}
    >

      <h3 className="fw-bold mb-4">
        ⭐ Customer Reviews
      </h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter Your Name"
        value={customerName}
        onChange={(e) =>
          setCustomerName(
            e.target.value
          )
        }
      />

      <select
        className="form-control mb-3"
        value={rating}
        onChange={(e) =>
          setRating(
            e.target.value
          )
        }
      >

        <option value="5">
          ⭐⭐⭐⭐⭐ (5)
        </option>

        <option value="4">
          ⭐⭐⭐⭐ (4)
        </option>

        <option value="3">
          ⭐⭐⭐ (3)
        </option>

        <option value="2">
          ⭐⭐ (2)
        </option>

        <option value="1">
          ⭐ (1)
        </option>

      </select>

      <textarea
        className="form-control mb-3"
        rows="3"
        placeholder="Write Your Review"
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

      {reviews.length === 0 ? (

        <div className="alert alert-info">
          No Reviews Yet
        </div>

      ) : (

        reviews.map((review) => (

          <div
            key={review.id}
            className="card border-0 shadow-sm p-3 mb-3"
          >

            <h5 className="fw-bold">
              👤 {review.customerName}
            </h5>

            <p className="text-warning fs-5 mb-1">
              {"⭐".repeat(
                review.rating
              )}
            </p>

            <p className="mb-0">
              {review.comment}
            </p>

          </div>

        ))

      )}

    </div>

  );

}

export default Reviews;