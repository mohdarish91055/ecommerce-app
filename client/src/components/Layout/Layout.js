import React from 'react'
import Headers from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
 import{ ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children,title,description,keywords,author})=>{
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <div>
                    <meta name='description' content={description}/>
                    <meta name='keywords' content={keywords}/>
                    <meta name='author' content={author}/>
                </div>
                <title>{title}</title>
            </Helmet>
            <Headers/>
            <main style={{ minHeight:"70vh" }}> 
                {children}
                <ToastContainer 
                    autoClose={1000}
                />
            </main>
            <Footer/>
        </div>
    )
}

Layout.defaultProps = {
    title : 'Ecommerce app',
    description : 'mern stack project',
    keywords : 'mern,react,node,mongodb',
    author : 'arish'
} 

export default Layout