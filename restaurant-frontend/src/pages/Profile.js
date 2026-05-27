import NavbarComponent from "../components/NavbarComponent";

function Profile() {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    return (

        <div>

            <NavbarComponent />

            <div className="container mt-5">

                <div className="card shadow p-4">

                    <h2 className="mb-4">
                        User Profile
                    </h2>

                    <h4>
                        Name:
                        {" "}
                        {currentUser?.name}
                    </h4>

                    <h4>
                        Email:
                        {" "}
                        {currentUser?.email}
                    </h4>

                    <h4>
                        Role:
                        User
                    </h4>

                </div>

            </div>

        </div>
    );
}

export default Profile;