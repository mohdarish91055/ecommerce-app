import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import UserMenu from './UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
  //context
  const [auth,setAuth] = useAuth()

  //state
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [phone,setPhone] = useState('')
  const [address,setAddress] = useState('')

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
        const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{name,email,password,phone,address})
        if(data?.error){
          toast.error(data?.error)
        }
        else{
          setAuth({...auth,user:data?.updatedUser})
          let ls = localStorage.getItem("auth")
          ls = JSON.parse(ls)
          ls.user = data.updatedUser
          localStorage.setItem('auth',JSON.stringify(ls))
          toast.success('Profile Updated Successfully')
        }
    } catch(error){
        console.log(error)
        toast.error('Something went wrong')            
    }
   
}

//get user data
useEffect(()=>{
  const {email,name,phone,address} = auth?.user
  setName(name)
  setEmail(email)
  setPhone(phone)
  setAddress(address)
},[auth?.user])


  return (
    <Layout title={'your profile'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-9'>
            <div className='register'>
                <h1>USER PROFILE</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
    
            <input
            type="text"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            className="form-control"
            id="exampleInputEmail1"
            placeholder='Enter Your Name'
            required/>
            </div>

            <div className="mb-3">
   
            <input
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="form-control"
            id="exampleInputEmail1"
            placeholder='Enter Your Email'
            // required
            disabled
            />
             </div>

            <div className="mb-3">
   
            <input
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            className="form-control"
            id="exampleInputPassword1"
            placeholder='Enter Your Password'
            // required
            />
            </div>

            <div className="mb-3">
    
            <input
            type="text"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            className="form-control"
            id="exampleInputEmail1"
            placeholder='Enter Your Phone'
            // required
            />
    
            </div>

            <div className="mb-3">
    
            <input
            type="text"
            value={address}
            onChange={(e)=>{setAddress(e.target.value)}}
            className="form-control"
            id="exampleInputEmail1"
            placeholder='Enter Your Address'
            // required
            />
    
            </div>

            

    

  <button type="submit" className="btn btn-primary">
    UPDATE
  </button>
</form>

            </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
