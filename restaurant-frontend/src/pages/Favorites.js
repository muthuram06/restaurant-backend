import React, {
  useEffect,
  useState
} from "react";

import NavbarComponent
from "../components/NavbarComponent";

function Favorites() {

  const [favorites,
    setFavorites] =
    useState([]);

  useEffect(() => {

    const savedFavorites =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        )
      ) || [];

    setFavorites(
      savedFavorites
    );

  }, []);

  const removeFavorite =
    (id) => {

      const updatedFavorites =
        favorites.filter(
          (food) =>
            food.id !== id
        );

      localStorage.setItem(
        "favorites",
        JSON.stringify(
          updatedFavorites
        )
      );

      setFavorites(
        updatedFavorites
      );
    };

  const addToCart =
    (food) => {

      const cart =
        JSON.parse(
          localStorage.getItem(
            "cart"
          )
        ) || [];

      const existingFood =
        cart.find(
          (item) =>
            item.id === food.id
        );

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

      window.dispatchEvent(
        new Event(
          "cartUpdated"
        )
      );

      alert(
        "Added To Cart"
      );
    };

  return (

    <div
      style={{
        minHeight:
          "100vh",
        background:
          "linear-gradient(135deg,#fff7ed,#fef2f2)"
      }}
    >

      <NavbarComponent />

      <div className="container py-5">

        <div
          className="card border-0 shadow-lg mb-5"
          style={{
            borderRadius:
              "25px"
          }}
        >

          <div
            className="card-body text-center"
          >

            <h1 className="fw-bold text-danger">

              ❤️ My Favorites

            </h1>

            <h4 className="text-muted">

              Total Favorites :
              {" "}
              {favorites.length}

            </h4>

          </div>

        </div>

        {favorites.length === 0 ? (

          <div
            className="card border-0 shadow-lg"
          >

            <div className="card-body text-center p-5">

              <h1>
                💔
              </h1>

              <h3>
                No Favorites Yet
              </h3>

              <p className="text-muted">

                Add foods to
                your wishlist.

              </p>

            </div>

          </div>

        ) : (

          <div className="row">

            {favorites.map(
              (food) => (

                <div
                  key={food.id}
                  className="col-lg-4 col-md-6 mb-4"
                >

                  <div
                    className="card border-0 shadow-lg h-100"
                    style={{
                      borderRadius:
                        "25px",
                      overflow:
                        "hidden"
                    }}
                  >

                    <img
                      src={
                        food.imageUrl
                      }
                      alt={
                        food.name
                      }
                      className="card-img-top"
                      style={{
                        height:
                          "250px",
                        objectFit:
                          "cover"
                      }}
                    />

                    <div className="card-body">

                      <h4 className="fw-bold">

                        {food.name}

                      </h4>

                      <p
                        className="text-muted"
                      >

                        {
                          food.description
                        }

                      </p>

                      <h4 className="text-success">

                        ₹
                        {food.price}

                      </h4>

                      <div className="d-grid gap-2 mt-3">

                        <button
                          className="btn btn-success"
                          onClick={() =>
                            addToCart(
                              food
                            )
                          }
                        >

                          🛒 Add To Cart

                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            removeFavorite(
                              food.id
                            )
                          }
                        >

                          Remove Favorite

                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default Favorites;