import React from "react";
import Layout from "../components/Layout/Layout";

const About = ()=>{
    return(
        <Layout title={'About-Us'}>
            <div className="row about">
                <div className="col-md-6">
                    <img 
                        src="D:\ecommerce-app\client\src\image\download.jpg"
                        alt="about"
                        style={{width:"100%"}}
                        />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">About</h1>
                    <p className="text-justify mt-2">
                    E-commerce, or electronic commerce, is the buying and selling of goods and services over the internet. It can involve the exchange of products or services between businesses and consumers, or between businesses themselves. E-commerce can take place through websites, mobile apps, or online marketplace
                    </p>
                    
                </div>
            </div>
        </Layout>
    )
}

export default About