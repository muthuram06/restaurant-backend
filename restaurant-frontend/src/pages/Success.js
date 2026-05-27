import NavbarComponent from "../components/NavbarComponent";

function Success() {

    const customer =
        JSON.parse(
            localStorage.getItem("customerDetails")
        );

    return (

        <div>

            <NavbarComponent />

            <div className="container mt-5">

                <div className="card shadow p-5 text-center">

                    <h1 className="text-success">
                        🎉 Order Successful
                    </h1>

                    <h4 className="mt-4">
                        Thank You,
                        {customer?.customerName}
                    </h4>

                    <p className="mt-3">
                        Your order will be delivered soon.
                    </p>

                    <h5>
                        📞 {customer?.phone}
                    </h5>

                    <h5>
                        📍 {customer?.address}
                    </h5>

                </div>

            </div>

        </div>
    );
}

export default Success;