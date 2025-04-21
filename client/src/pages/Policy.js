import React from "react";
import Layout from "../components/Layout/Layout";
import privacy from "../image/privacy.png";

const Policy = () => {
  return (
    <Layout title={"Policy"}>
      <div
        className="row policy"
        style={{ padding: "20px", backgroundColor: "#f9f9f9" }}
      >
        <div
          className="col-md-6"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={privacy}
            alt="privacy and policy"
            style={{
              width: "100%",
              maxWidth: "500px", // Ensures the image doesn't get too large
              margin: "20px",
              borderRadius: "8px", // Optional: adds rounded corners to the image
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: adds a light shadow around the image
            }}
          />
        </div>
        <div className="col-md-6" style={{ padding: "20px" }}>
          <h1
            className="bg-dark p-2 text-white text-center"
            style={{ fontSize: "2rem", borderRadius: "5px" }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-justify mt-2"
            style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#333" }}
          >
            At <em>e-Dukan</em>, we respect your privacy and are committed to
            protecting your personal information. When you visit or make a
            purchase on our website, we may collect data such as your name,
            email, address, payment details . This information is used to
            process orders, provide customer support, improve our services, and,
            if you opt in, send promotional content. We do not sell your data
            and only share it with essential service providers such as payment
            gateways and shipping partners. Our website uses cookies to enhance
            your browsing experience, and you can manage these through your
            browser settings. You have the right to access, update, or delete
            your personal data and can contact us at
            <emp>arishsaifi91055@gmail.com</emp> for any privacy concerns. By
            using our site, you agree to this policy, which may be updated
            periodically.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
