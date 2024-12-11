import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = ()=>{
    return(
        <Layout title={'Policy'}>
             <div className="row policy">
                <div className="col-md-6">
                    <img 
                        src="client\src\image\download.png"
                        alt="privacy and policy"
                        style={{width:"100%"}}
                        />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">Privacy Policy</h1>
                    <p className="text-justify mt-2">
                    A privacy policy is a legal document or statement that explains how a company or organization collects, uses, and manages the personal data of its customers or clients
                    </p>
                    <p className="text-justify mt-2">
                    The types of personal information collected
                    </p>
                    <p className="text-justify mt-2">
                    The reasons for collecting the data
                    </p>
                    <p className="text-justify mt-2">
                    How the data is used
                    </p>
                    <p className="text-justify mt-2">
                    Where the data is stored
                    </p>
                    <p className="text-justify mt-2">
                    Who has access to the data
                    </p>
                    
                </div>
            </div>
        </Layout>
    )
}

export default Policy