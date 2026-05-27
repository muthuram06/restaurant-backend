import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

function EditFood() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [food, setFood] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: ""
    });

    useEffect(() => {

        const foods =
            JSON.parse(localStorage.getItem("foods")) || [];

        const selectedFood =
            foods.find((item) => item.id === parseInt(id));

        if (selectedFood) {
            setFood(selectedFood);
        }

    }, [id]);

    const handleChange = (e) => {

        setFood({
            ...food,
            [e.target.name]: e.target.value
        });
    };

    const updateFood = () => {

        let foods =
            JSON.parse(localStorage.getItem("foods")) || [];

        foods = foods.map((item) =>
            item.id === food.id ? food : item
        );

        localStorage.setItem(
            "foods",
            JSON.stringify(foods)
        );

        alert("Food Updated Successfully ✅");

        navigate("/admin");
    };

    return (
        <div>

            <NavbarComponent />

            <div className="container mt-5">

                <div className="card shadow p-4">

                    <h2 className="text-center mb-4">
                        Edit Food
                    </h2>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Food Name"
                        name="name"
                        value={food.name}
                        onChange={handleChange}
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Description"
                        name="description"
                        value={food.description}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Price"
                        name="price"
                        value={food.price}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Image URL"
                        name="imageUrl"
                        value={food.imageUrl}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Category"
                        name="category"
                        value={food.category}
                        onChange={handleChange}
                    />

                    <button
                        className="btn btn-warning"
                        onClick={updateFood}
                    >
                        Update Food
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EditFood;