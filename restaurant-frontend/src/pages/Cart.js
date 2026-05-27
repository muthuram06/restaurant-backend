import React, { useEffect, useState } from "react";

import NavbarComponent from "../components/NavbarComponent";

function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(storedCart);

  }, []);

  const increaseQuantity = (index) => {

    const updatedCart = [...cart];

    updatedCart[index].quantity += 1;

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const decreaseQuantity = (index) => {

    const updatedCart = [...cart];

    if (updatedCart[index].quantity > 1) {

      updatedCart[index].quantity -= 1;

    } else {

      updatedCart.splice(index, 1);

    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const removeFood = (index) => {

    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const subtotal = cart.reduce(

    (total, item) =>

      total + item.price * item.quantity,

    0
  );

  const deliveryFee = 40;

  const gst = subtotal * 0.05;

  const grandTotal =
    subtotal + deliveryFee + gst;

  const proceedToCheckout = () => {

    localStorage.setItem(
      "totalAmount",
      grandTotal
    );

    window.location.href = "/checkout";
  };

  return (

    <div>

      <NavbarComponent />

      <div className="container mt-5">

        <h1 className="mb-4">
          My Cart
        </h1>

        {cart.length === 0 ? (

          <h3 className="text-danger">
            Cart Is Empty
          </h3>

        ) : (

          <div className="row">

            <div className="col-md-8">

              {cart.map((food, index) => (

                <div
                  className="card mb-4 shadow"
                  key={index}
                >

                  <div className="row g-0">

                    <div className="col-md-4">

                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="img-fluid rounded-start"
                        style={{
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />

                    </div>

                    <div className="col-md-8">

                      <div className="card-body">

                        <h3>{food.name}</h3>

                        <p>{food.description}</p>

                        <h4 className="text-success">
                          ₹ {food.price}
                        </h4>

                        <div className="d-flex align-items-center mt-3">

                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              decreaseQuantity(index)
                            }
                          >
                            -
                          </button>

                          <h5 className="mx-3 mt-2">
                            {food.quantity}
                          </h5>

                          <button
                            className="btn btn-success"
                            onClick={() =>
                              increaseQuantity(index)
                            }
                          >
                            +
                          </button>

                        </div>

                        <h5 className="mt-3">

                          Total :
                          ₹ {
                            food.price *
                            food.quantity
                          }

                        </h5>

                        <button
                          className="btn btn-dark mt-3"
                          onClick={() =>
                            removeFood(index)
                          }
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <div className="col-md-4">

              <div className="card shadow p-4">

                <h2>Bill Details</h2>

                <hr />

                <h5>
                  Subtotal :
                  ₹ {subtotal.toFixed(2)}
                </h5>

                <h5>
                  GST (5%) :
                  ₹ {gst.toFixed(2)}
                </h5>

                <h5>
                  Delivery Fee :
                  ₹ {deliveryFee}
                </h5>

                <hr />

                <h3 className="text-success">

                  Grand Total :
                  ₹ {grandTotal.toFixed(2)}

                </h3>

                <button
                  className="btn btn-primary w-100 mt-4"
                  onClick={proceedToCheckout}
                >
                  Proceed To Checkout
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;