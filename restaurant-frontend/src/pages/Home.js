import React, { useEffect, useState } from "react";
import axios from "axios";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

function Home() {

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {

      const response = await axios.get(
        "https://restaurant-backend-ca51.onrender.com/api/food/all"
      );

      console.log("Foods Loaded:", response.data);

      setFoods(response.data);

    } catch (error) {

      console.error("Error loading foods:", error);

    }
  };

  const filteredFoods = foods.filter((food) => {

    const matchesSearch =
      food.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      food.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <NavbarComponent />

      <div className="alert alert-success text-center fw-bold mb-0">
        🌱 100% PURE VEG RESTAURANT
      </div>

      <div className="container mt-4">

        <h1 className="text-center fw-bold">
          Welcome To AFNA'S GARDEN RESTAURANT
        </h1>

        <div className="alert alert-warning text-center">
          🔥 Best Sellers : Paneer Butter Masala, Veg Biryani, Masala Dosa
        </div>

        <h2 className="text-center text-secondary mb-4">
          {filteredFoods.length} Foods Available
        </h2>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="🔍 Search Veg Foods..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mb-4">
          <button
            className="btn btn-dark me-2"
            onClick={() => setCategory("All")}
          >
            All
          </button>

          <button
            className="btn btn-success me-2"
            onClick={() => setCategory("Veg")}
          >
            Veg
          </button>

          <button
            className="btn btn-primary me-2"
            onClick={() => setCategory("North Indian")}
          >
            North Indian
          </button>

          <button
            className="btn btn-danger me-2"
            onClick={() => setCategory("South Indian")}
          >
            South Indian
          </button>

          <button
            className="btn btn-warning"
            onClick={() => setCategory("Fast Food")}
          >
            Fast Food
          </button>
        </div>

        <div className="row">

          {filteredFoods.map((food) => (

            <div
              className="col-md-4 mb-4"
              key={food.id}
            >

              <div className="card shadow h-100">

                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="card-img-top"
                  style={{
                    height: "250px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body">

                  <h4>{food.name}</h4>

                  <p>{food.description}</p>

                  <h5 className="text-success">
                    ₹{food.price}
                  </h5>

                  <span className="badge bg-success">
                    {food.category}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <FooterComponent />
    </>
  );
}

export default Home;