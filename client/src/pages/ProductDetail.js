import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useState } from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'

const ProductDetail = () => {
    const params = useParams()
    const [product,setProuduct] = useState({})
    const [reltedProduct, setRelatedProduct] = useState([])
    const [cart,setCart] = useCart()
    const [auth,setAuth] = useAuth()
    const navigate = useNavigate();
   
    // Handle Add to Cart
  const handleAddToCart = (product) => {
    if (!auth?.user) {
      toast.error("Please log in to add items to your cart");
      navigate("/login");
      return;
    }
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item added to cart");
  };

    //initial detail
    useEffect(()=>{
       if(params?.slug) getProduct() 
    },[params?.slug])

    //get product 
    const getProduct = async ()=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProuduct(data?.product)
            
            getSimilarProduct(data?.product._id,data?.product.category._id)
        }
        catch(error){
            console.log(error)
        }
    }

    //get similar product
    const getSimilarProduct = async (pid,cid)=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProduct(data?.products)
            console.log(reltedProduct)
        }catch(error){
            console.log(error)
        }
    }


  return (
    <Layout>
      <div className='row container mt-3'>
        <div className='col-md-6'>
              <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}  
            className="card-img-top" 
            alt={product.name} 
            height='300'
            width={'200px'}
            /> 
        </div>
        <div className='col-md-6'>
            <h1 className='text-center'>Product Details</h1>
            <h6>Name : {product.name}</h6>
            <h6>Description : {product.description}</h6>
            <h6>Price : ${product.price}</h6>
            <button className='btn btn-secondary ms-1'
              onClick={()=> handleAddToCart(product)}
             
            >ADD TO CART
            </button>
            {console.log(product)}
        </div>
      </div>
      <div className='row-container m-2'>
        <h2>Similar Product</h2>
        <div className="d-flex flex-wrap">
                    
            {reltedProduct?.map((p)=>{
             return(
                
                <div className="card m-2" style={{ width: "18rem" }} >
                   <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                   <div className="card-body">
                   <h5 className="card-title">{p.name}</h5>
                   <p className="card-text">
                   {p.description}
                   </p> 
                   <p className="card-text">${p.price}</p> 
                   
                   <button href="#" className="btn btn-secondary ms-1" >Add to cart</button>
                    </div>
               </div>

            )
        })}
        
                    </div> 


      </div>
    </Layout>
  )
}

export default ProductDetail
