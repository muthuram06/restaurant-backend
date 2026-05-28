import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

      console.log(response.data);

      setFoods(response.data);

    } catch (error) {

      console.log("Error fetching foods:", error);

    }
  };

  const addToCart = (food) => {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingFood =
      cart.find((item) => item.id === food.id);

    if (existingFood) {

      existingFood.quantity += 1;

    } else {

      cart.push({
        ...food,
        quantity: 1
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Food Added To Cart");
  };

  const addToFavorites = (food) => {

    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.push(food);

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

    alert("Food Added To Favorites");
  };

  const filteredFoods = foods.filter((food) => {

    const matchesSearch =
      food.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      food.category === category;

    return matchesSearch && matchesCategory;

  });

  return (

    <div>

      <NavbarComponent />

      <div className="alert alert-success text-center fw-bold mb-0">
        🌱 100% PURE VEG RESTAURANT
      </div>

      <div className="container mt-4">

        <h1 className="text-center fw-bold mb-3">
          Welcome To AFNA'S GARDEN RESTAURANT
        </h1>

        <div className="alert alert-warning text-center">
          🔥 Best Sellers :
          Paneer Butter Masala,
          Veg Biryani,
          Masala Dosa
        </div>

        <h2 className="text-center text-secondary mb-4">
          {filteredFoods.length} Foods Available
        </h2>

        <input
          type="text"
          className="form-control mb-4 shadow-sm"
          placeholder="🔍 Search Veg Foods..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="mb-4 d-flex flex-wrap">

          <button
            className="btn btn-dark m-1"
            onClick={() => setCategory("All")}
          >
            All
          </button>

          <button
            className="btn btn-success m-1"
            onClick={() => setCategory("South Indian")}
          >
            South Indian
          </button>

          <button
            className="btn btn-primary m-1"
            onClick={() => setCategory("North Indian")}
          >
            North Indian
          </button>

          <button
            className="btn btn-danger m-1"
            onClick={() => setCategory("Chinese")}
          >
            Chinese
          </button>

          <button
            className="btn btn-warning m-1"
            onClick={() => setCategory("Fast Food")}
          >
            Fast Food
          </button>

          <button
            className="btn btn-info m-1"
            onClick={() => setCategory("Street Food")}
          >
            Street Food
          </button>

        </div>

        <div className="row">

          {filteredFoods.map((food) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={food.id}
            >

              <div className="card h-100 shadow border-0">

                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="card-img-top"
                  style={{
                    height: "300px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body">

                  <span className="badge bg-success mb-2">
                    100% VEG
                  </span>

                  <h3>{food.name}</h3>

                  <p>{food.description}</p>

                  <h4 className="text-success">
                    ₹ {food.price}
                  </h4>

                  <h6 className="text-secondary">
                    {food.category}
                  </h6>

                  <div className="mb-2">
                    ⭐⭐⭐⭐⭐
                  </div>

                  <Link
                    to="/food-details"
                    state={food}
                    className="btn btn-dark w-100 mt-2"
                  >
                    View Details
                  </Link>

                  <button
                    className="btn btn-success w-100 mt-2"
                    onClick={() => addToCart(food)}
                  >
                    Add To Cart
                  </button>

                  <button
                    className="btn btn-warning w-100 mt-2"
                    onClick={() => addToFavorites(food)}
                  >
                    Add To Favorites
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <FooterComponent />

    </div>
  );
}

export default Home;