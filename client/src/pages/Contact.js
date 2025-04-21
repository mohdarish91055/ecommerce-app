import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import contact from "../image/contact.jpg";

const Contact = () => {
  return (
    <Layout title={"Contact"}>
      <div
        className="row contactus"
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
            src={contact}
            alt="contactus"
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
        <div className="col-md-6" style={{ padding: "20px" }}>
          <h1
            className="bg-dark p-2 text-white text-center"
            style={{ fontSize: "2rem", borderRadius: "5px" }}
          >
            CONTACT US
          </h1>
          <p
            className="text-justify mt-2"
            style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#333" }}
          >
            If you have any questions, concerns, or need assistance with your
            order, we’re here to help. You can reach out to us anytime via email
            at <emp>arishsaifi91055@gmail.com</emp> or by phone at
            <emp>+91-9105582165.</emp> We aim to respond to all inquiries within
            24–48 hours. For updates, support, or general feedback, don’t
            hesitate to get in touch. Your satisfaction is our top priority!
          </p>

          <div
            className="contact-icons"
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <BiMailSend size={30} color="#007BFF" />
              <p>Email</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <BiPhoneCall size={30} color="#007BFF" />
              <p>Phone</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <BiSupport size={30} color="#007BFF" />
              <p>Support</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
