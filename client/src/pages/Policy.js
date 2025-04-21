import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Policy"}>
      <div className="row policy">
        <div className="col-md-6">
          <img
            src="client\src\image\download.png"
            alt="privacy and policy"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Privacy Policy</h1>
          <p className="text-justify mt-2">
            At <em>e-Dukan</em>, we respect your privacy and are committed to
            protecting your personal information. When you visit or make a
            purchase on our website, we may collect data such as your name,
            email, address, payment details (securely handled by trusted
            third-party processors like Stripe or PayPal), and technical
            information like IP address and browser type. This information is
            used to process orders, provide customer support, improve our
            services, and, if you opt in, send promotional content. We do not
            sell your data and only share it with essential service providers
            such as payment gateways and shipping partners. Our website uses
            cookies to enhance your browsing experience, and you can manage
            these through your browser settings. You have the right to access,
            update, or delete your personal data and can contact us at
            <strong>arishsaifi91055@gmail.com</strong> for any privacy concerns.
            By using our site, you agree to this policy, which may be updated
            periodically.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
