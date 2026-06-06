function FooterComponent() {

  return (

    <footer
      style={{
        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "white",
        marginTop: "60px"
      }}
    >

      <div className="container py-5">

        <div className="row">

          <div className="col-lg-4 mb-4">

            <h3 className="fw-bold">
              🌱 AFNA'S GARDEN
            </h3>

            <p className="mt-3">

              Premium Vegetarian Restaurant
              serving fresh, healthy and
              delicious food with authentic
              taste and quality ingredients.

            </p>

          </div>

          <div className="col-lg-4 mb-4">

            <h4>
              📞 Contact Us
            </h4>

            <p>
              📍 Chennai, Tamil Nadu
            </p>

            <p>
              📧 support@afnagarden.com
            </p>

            <p>
              📱 +91 9876543210
            </p>

          </div>

          <div className="col-lg-4 mb-4">

            <h4>
              ⏰ Opening Hours
            </h4>

            <p>
              Everyday
            </p>

            <p>
              7:00 AM - 10:00 PM
            </p>

          </div>

        </div>

        <hr
          style={{
            borderColor: "#475569"
          }}
        />

        <div className="row">

          <div className="col-md-6">

            <p className="mb-0">

              © 2026 AFNA'S GARDEN.
              All Rights Reserved.

            </p>

          </div>

          <div className="col-md-6 text-md-end mt-3 mt-md-0">

            <span
              className="me-3"
              style={{
                cursor: "pointer",
                fontSize: "24px"
              }}
            >
              📘
            </span>

            <span
              className="me-3"
              style={{
                cursor: "pointer",
                fontSize: "24px"
              }}
            >
              📸
            </span>

            <span
              className="me-3"
              style={{
                cursor: "pointer",
                fontSize: "24px"
              }}
            >
              🐦
            </span>

            <span
              style={{
                cursor: "pointer",
                fontSize: "24px"
              }}
            >
              ▶️
            </span>

          </div>

        </div>

      </div>

    </footer>

  );

}

export default FooterComponent;