import React from "react";
import Layout from "../components/Layout/Layout";
import about from "../image/about.jpg";

const About = () => {
  return (
    <Layout title={"About-Us"}>
      <div
        className="row about"
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
            src={about}
            alt="about"
            style={{
              width: "100%",
              maxWidth: "500px", // Ensures the image doesn't stretch too much
              borderRadius: "8px", // Rounded corners
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
            }}
          />
        </div>
        <div className="col-md-6" style={{ padding: "20px" }}>
          <h1
            className="bg-dark p-2 text-white text-center"
            style={{ fontSize: "2rem", borderRadius: "5px" }}
          >
            About Us
          </h1>
          <p
            className="text-justify mt-2"
            style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#333" }}
          >
            Welcome to <strong>e-Dukan</strong> – your trusted destination for
            quality products and a seamless online shopping experience. We’re
            passionate about bringing you the best, combining top-notch quality
            with unbeatable value. Our mission is to make shopping easy,
            enjoyable, and secure for everyone. Whether you're browsing or
            buying, we’re here to provide excellent service, fast delivery, and
            customer support you can count on. Thank you for choosing us – we're
            excited to be a part of your journey!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
