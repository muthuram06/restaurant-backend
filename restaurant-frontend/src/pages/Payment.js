import { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { saveOrder } from "../services/OrderService";

function Payment() {

    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [successMessage, setSuccessMessage]
    = useState("");

    const handlePayment = async () => {

        if (
            customerName === "" ||
            phone === "" ||
            address === ""
        ) {


            return;
        }

        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const currentUser =
            JSON.parse(localStorage.getItem("currentUser"));

        try {

            for (const item of cart) {

                const orderData = {

                    foodName: item.name,

                    price: item.price,

                    quantity: item.quantity,

                    totalPrice:
                        item.price * item.quantity,

                    userEmail: currentUser.email,

                    customerName: customerName,

                    phone: phone,

                    address: address
                };

                await saveOrder(orderData);
            }

            const orderDetails = {

                customerName,
                phone,
                address,
                date: new Date().toLocaleString()
            };

            localStorage.setItem(
                "customerDetails",
                JSON.stringify(orderDetails)
            );

            localStorage.removeItem("cart");

            setSuccessMessage(
                "Order Placed Successfully 🎉"
        );

            window.location.href = "/success";

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div>

            <NavbarComponent />

            <div className="container mt-5">

                <div className="card shadow p-4">

                    <h1 className="text-center mb-4">
                        Customer Details
                    </h1>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter Your Name"
                        value={customerName}
                        onChange={(e) =>
                            setCustomerName(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Enter Address"
                        rows="4"
                        value={address}
                        onChange={(e) =>
                            setAddress(e.target.value)
                        }
                    />

                        {
                            successMessage && (

                                <div className="alert alert-success">

                                    {successMessage}

                                </div>
                            )
                        }

                    <button
                        className="btn btn-success w-100"
                        onClick={handlePayment}
                    >
                        Confirm Order
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Payment;