import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img src="" alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            If you have any questions, concerns, or need assistance with your
            order, we’re here to help. You can reach out to us anytime via email
            at <strong>arishsaifi91055@gmail.com</strong> or by phone at
            +91-9105582165. We aim to respond to all inquiries within 24–48
            hours. For updates, support, or general feedback, don’t hesitate to
            get in touch. Your satisfaction is our top priority!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
