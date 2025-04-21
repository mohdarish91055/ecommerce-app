import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About-Us"}>
      <div className="row about">
        <div className="col-md-6">
          <img
            src="D:\ecommerce-app\client\src\image\download.jpg"
            alt="about"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">About</h1>
          <p className="text-justify mt-2">
            Welcome to <strong>e-dukan</strong> – your trusted destination for
            quality products and a seamless online shopping experience. We’re
            passionate about bringing you the best in [mention your product
            category, e.g., fashion, tech gadgets, home essentials], combining
            top-notch quality with unbeatable value. Our mission is to make
            shopping easy, enjoyable, and secure for everyone. Whether you're
            browsing or buying, we’re here to provide excellent service, fast
            delivery, and customer support you can count on. Thank you for
            choosing us – we're excited to be a part of your journey!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
