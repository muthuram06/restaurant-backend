import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function AdminFoods() {

  const [foods, setFoods] = useState([]);

  const [foodData, setFoodData] =
    useState({

      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: ""

    });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {

    fetchFoods();

  }, []);

  const fetchFoods = async () => {

    const response = await axios.get(
      "http://localhost:8080/api/food/all"
    );

    setFoods(response.data);
  };

  const handleChange = (e) => {

    setFoodData({

      ...foodData,
      [e.target.name]:
        e.target.value

    });
  };

  const addOrUpdateFood =
    async () => {

      if (editingId) {

        await axios.put(

          `http://localhost:8080/api/food/update/${editingId}`,

          foodData
        );

        alert("Food Updated");

      } else {

        await axios.post(

          "http://localhost:8080/api/food/add",

          foodData
        );

        alert("Food Added");
      }

      setFoodData({

        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: ""

      });

      setEditingId(null);

      fetchFoods();
    };

  const editFood = (food) => {

    setFoodData(food);

    setEditingId(food.id);
  };

  const deleteFood =
    async (id) => {

      await axios.delete(

        `http://localhost:8080/api/food/delete/${id}`
      );

      alert("Food Deleted");

      fetchFoods();
    };

  return (

    <div className="container mt-5">

      <h1 className="mb-4">
        Food Management
      </h1>

      <div className="card p-4 shadow mb-5">

        <input
          type="text"
          name="name"
          placeholder="Food Name"
          className="form-control mb-3"
          value={foodData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          className="form-control mb-3"
          value={foodData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="form-control mb-3"
          value={foodData.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="form-control mb-3"
          value={foodData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          className="form-control mb-3"
          value={foodData.imageUrl}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary"
          onClick={addOrUpdateFood}
        >

          {editingId
            ? "Update Food"
            : "Add Food"}

        </button>

      </div>

      <div className="row">

        {foods.map((food) => (

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
                  height: "250px",
                  objectFit: "cover"
                }}
              />

              <div className="card-body">

                <h3>{food.name}</h3>

                <p>
                  {food.description}
                </p>

                <h4>
                  ₹ {food.price}
                </h4>

                <h5>
                  {food.category}
                </h5>

                <button
                  className="btn btn-warning w-100 mt-2"
                  onClick={() =>
                    editFood(food)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger w-100 mt-2"
                  onClick={() =>
                    deleteFood(food.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminFoods;