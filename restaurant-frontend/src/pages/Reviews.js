import React, { useState, useEffect } from "react";
import axios from "axios";

function Reviews({ foodName }) {

  const [reviews, setReviews] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const API_URL =
    "https://restaurant-backend-ca51.onrender.com/api/reviews";

  useEffect(() => {

    const loadReviews = async () => {

      try {

        const response =
          await axios.get(
            `${API_URL}/${foodName}`
          );

        setReviews(response.data || []);

      } catch (error) {

        console.error(error);

      }

    };

    if (foodName) {
      loadReviews();
    }

  }, [foodName]);

  const submitReview = async () => {

    if (!customerName.trim()) {

      alert("Please enter your name");

      return;

    }

    if (!comment.trim()) {

      alert("Please enter review");

      return;

    }

    try {

      await axios.post(API_URL, {

        foodName,
        customerName,
        rating: Number(rating),
        comment

      });

      const response =
        await axios.get(
          `${API_URL}/${foodName}`
        );

      setReviews(response.data || []);

      setCustomerName("");
      setComment("");
      setRating(5);

      alert(
        "Review Submitted Successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Submit Review"
      );

    }

  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) =>
              sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : 0;

  return (

    <div
      className="card border-0 shadow-lg mt-5"
      style={{
        borderRadius: "25px"
      }}
    >

      <div
        className="text-white p-4"
        style={{
          background:
            "linear-gradient(135deg,#16a34a,#22c55e)"
        }}
      >

        <h2 className="fw-bold">
          ⭐ Customer Reviews
        </h2>

        <h5>
          Average Rating :
          {" "}
          {averageRating} ⭐
        </h5>

        <p>
          {reviews.length} Reviews
        </p>

      </div>

      <div className="p-4">

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Your Name"
          value={customerName}
          onChange={(e) =>
            setCustomerName(e.target.value)
          }
        />

        <select
          className="form-control mb-3"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
        >

          <option value="5">
            ⭐⭐⭐⭐⭐ Excellent
          </option>

          <option value="4">
            ⭐⭐⭐⭐ Good
          </option>

          <option value="3">
            ⭐⭐⭐ Average
          </option>

          <option value="2">
            ⭐⭐ Poor
          </option>

          <option value="1">
            ⭐ Bad
          </option>

        </select>

        <textarea
          rows="4"
          className="form-control mb-3"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />

        <button
          className="btn btn-success w-100"
          onClick={submitReview}
        >
          Submit Review
        </button>

        <hr />

        {reviews.length === 0 ? (

          <div className="text-center">

            <h5>No Reviews Yet</h5>

          </div>

        ) : (

          reviews.map((review, index) => (

            <div
              key={index}
              className="card border-0 shadow-sm mb-3"
            >

              <div className="card-body">

                <h5>
                  👤 {review.customerName}
                </h5>

                <p className="text-warning">

                  {"⭐".repeat(
                    review.rating
                  )}

                </p>

                <p>
                  {review.comment}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Reviews;