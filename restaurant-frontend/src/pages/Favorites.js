import { useEffect, useState } from "react";

import NavbarComponent
from "../components/NavbarComponent";

function Favorites() {

    const [favorites, setFavorites] =
        useState([]);

    useEffect(() => {

        const savedFavorites =
            JSON.parse(
                localStorage.getItem("favorites")
            ) || [];

        setFavorites(savedFavorites);

    }, []);

    const removeFavorite = (id) => {

        const updatedFavorites =
            favorites.filter(
                (food) => food.id !== id
            );

        localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
        );

        setFavorites(updatedFavorites);
    };

    return (

        <div>

            <NavbarComponent />

            <div className="container mt-5">

                <h1 className="text-center mb-5">
                    ❤️ Favorite Foods
                </h1>

                <div className="row">

                    {favorites.map((food) => (

                        <div
                            className="col-md-4 mb-4"
                            key={food.id}
                        >

                            <div className="card shadow h-100">

                                <img
                                    src={food.imageUrl}
                                    alt={food.name}
                                    className="card-img-top"
                                    height="250"
                                    style={{
                                        objectFit: "cover"
                                    }}
                                />

                                <div className="card-body">

                                    <h4>{food.name}</h4>

                                    <p>
                                        {food.description}
                                    </p>

                                    <h5>
                                        ₹ {food.price}
                                    </h5>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            removeFavorite(
                                                food.id
                                            )
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Favorites;