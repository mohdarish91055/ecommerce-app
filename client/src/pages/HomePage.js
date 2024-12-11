import React ,{useState,useEffect} from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import {Checkbox,Radio} from 'antd'
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";

const HomePage = ()=>{
    const navigate = useNavigate()
    const [cart,setCart] = useCart()
    const [products,setProuducts] = useState([])
    const [categories,setCategories] = useState([])
    const [checked,setChecked] = useState([])
    const [radio,setRadio] = useState([])
    const [total,setTotal] = useState(0)
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)
    const [auth,setAuth] = useAuth()

    // Handle Add to Cart
  const handleAddToCart = (product) => {
    if (!auth?.user) {
      toast.error("Please log in to add items to your cart");
      navigate("/login");
      return;
    }

    const cartItem = { ...product, userId: auth.user.id };

    const updatedCart = [...cart, cartItem];
    setCart(updatedCart);
    console.log(cart)
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item added to cart");
  };

      //get all cat
  const getAllCategory = async()=>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if(data?.success){
        setCategories(data?.category)
      }
    }
    catch(error)
    {
      console.log(error)
    }
  }

    useEffect(()=>{
        getAllCategory()
        getTotal();
    },[])

    //get products 
    const getAllProducts = async()=>{
        try{
            // setLoading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            // setLoading(false)
            setProuducts(data.products)
            console.log("cart",cart)
           
        }catch(error){
            setLoading(false)
            console.log(error)
        }
    }

       //get total count
       const getTotal = async()=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
            setTotal(data?.total)
            

        }catch(error){
            console.log(error)
        }
    }

    // //filter by category
    const handleFilter = (value,id)=>{
       let all = [...checked]
       if(value){
            all.push(id)
       }else{
            all = all.filter(c => c!==id)
       }
       setChecked(all)
    }

    useEffect(()=>{
        if(!checked.length || !radio.length) getAllProducts();
    },[checked.length,radio.length])

    
    useEffect(()=>{
        if(checked.length || radio.length) filterProduct(); 
     },[checked,radio])

    //get filter
    const filterProduct = async ()=>{
        try{
            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`,{checked,radio})
            setProuducts(data?.products)
           
        }catch(error){
            console.log(error)
        }
    }

    return(
        <Layout title={'All Product Best Offers'}>
            <div className="row mt-3">
                <div className="col-md-3">
                    <h4 className="ms-5">Filter By Category</h4>
                        <div className="d-flex flex-column ms-5">
                        {
                        categories?.map(c=>{
                            return(
                                <Checkbox key={c._id} onChange={(e)=>{handleFilter(e.target.checked,c._id)}}>
                                    {c.name}
                                </Checkbox>
                            )
                        })                    
                        }
                        </div>

                        
                        <h4 className="ms-5 mt-2">Filter By Price</h4>
                        <div className="d-flex flex-column ms-5">
                           <Radio.Group onChange={e=>{setRadio(e.target.value)}}>
                            {
                                Prices.map(p=>(
                                    <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))
                            }
                           </Radio.Group>
                        </div>

                        <div className="d-flex flex-column ms-3 me-2 mt-2">
                           <button className="btn btn-danger" onClick={()=>window.location.reload()}> RESET FILTERS</button>
                        </div>
                   
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                    
            {products?.map((p)=>{
             return(
                
                <div className="card m-2" style={{ width: "18rem" }} >
                   <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                   <div className="card-body">
                   <h5 className="card-title">{p.name}</h5>
                   <p className="card-text">
                   {p.description}
                   </p> 
                   <p className="card-text">₹{p.price}</p> 
                   <button href="#" className="btn btn-primary  ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                   <button href="#" className="btn btn-secondary ms-1" onClick={() => handleAddToCart(p)}>Add to cart</button>
                    </div>
               </div>

            )
        })}
        
                    </div>
                    
                </div>
            </div>
        </Layout>
    )
}

export default HomePage