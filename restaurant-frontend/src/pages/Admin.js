import React, { useEffect, useState } from "react";
import axios from "axios";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

function Home() {

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/food/all"
      );

      setFoods(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const addToCart = (food) => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingFood = existingCart.find(
      (item) => item.id === food.id
    );

    if (existingFood) {

      existingFood.quantity += 1;

    } else {

      existingCart.push({
        ...food,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Food Added To Cart");
  };

  const addToFavorites = (food) => {

    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    existingFavorites.push(food);

    localStorage.setItem(
      "favorites",
      JSON.stringify(existingFavorites)
    );

    alert("Food Added To Favorites");
  };

  let filteredFoods = foods.filter((food) => {

    const matchesSearch =
      food.name.toLowerCase().includes(
        search.toLowerCase()
      );

    const matchesCategory =
      category === "All" ||
      food.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sortType === "low") {

    filteredFoods.sort(
      (a, b) => a.price - b.price
    );

  }

  if (sortType === "high") {

    filteredFoods.sort(
      (a, b) => b.price - a.price
    );

  }

  return (

    <div>

      <NavbarComponent />

      <div className="container mt-4">

        {/* OFFER BANNER */}

        <div className="alert alert-warning text-center fw-bold fs-5">

          🎉 Weekend Offer :
          Flat 50% OFF On Selected Foods

        </div>

        <h1 className="text-center mb-3 fw-bold">
          Welcome To AFNA'S GARDEN RESTAURANT
        </h1>

        <h2 className="text-center text-secondary mb-4">
          {filteredFoods.length} Foods Available
        </h2>

        <div className="row mb-4">

          <div className="col-md-8">

            <input
              type="text"
              className="form-control"
              placeholder="Search Foods..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="col-md-4">

            <select
              className="form-select"
              value={sortType}
              onChange={(e) =>
                setSortType(e.target.value)
              }
            >

              <option value="">
                Sort By
              </option>

              <option value="low">
                Price Low To High
              </option>

              <option value="high">
                Price High To Low
              </option>

            </select>

          </div>

        </div>

        <div className="mb-4">

          <button
            className="btn btn-dark mx-2"
            onClick={() => setCategory("All")}
          >
            All
          </button>

          <button
            className="btn btn-success mx-2"
            onClick={() =>
              setCategory("South Indian")
            }
          >
            South Indian
          </button>

          <button
            className="btn btn-primary mx-2"
            onClick={() =>
              setCategory("North Indian")
            }
          >
            North Indian
          </button>

          <button
            className="btn btn-danger mx-2"
            onClick={() =>
              setCategory("Chinese")
            }
          >
            Chinese
          </button>

        </div>

        <div className="row">

          {filteredFoods.map((food) => (

            <div
              className="col-md-4 mb-4"
              key={food.id}
            >

              <div className="card h-100 shadow">

                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="card-img-top"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <h2>{food.name}</h2>

                    <span className="badge bg-success p-2">

                      Available

                    </span>

                  </div>

                  <p>{food.description}</p>

                  <h3 className="text-success">
                    ₹ {food.price}
                  </h3>

                  <h5 className="text-secondary">
                    {food.category}
                  </h5>

                  {/* FOOD RATING */}

                  <div className="mb-2 text-warning fs-5">

                    ⭐⭐⭐⭐⭐

                  </div>

                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={() =>
                      addToCart(food)
                    }
                  >
                    Add To Cart
                  </button>

                  <button
                    className="btn btn-warning w-100 mt-2"
                    onClick={() =>
                      addToFavorites(food)
                    }
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