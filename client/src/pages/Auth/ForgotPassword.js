import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const [email,setEmail] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [answer,setAnswer] = useState('')
   
    const navigate = useNavigate()
  

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,answer,newPassword})
            console.log(res.body)
            if(res.data.success){
                toast.success(res.data.message)
                setTimeout(()=>{
                    navigate('/login')
                },2000)
            }
            else{
                toast.error(res.data.message)
            }
            
        } catch(error){
            console.log(error)
            toast.error('Something went wrong')            
        }
        
     
    }

  return (
    <Layout title={'forgot password'}>
      <h1>ForgotPassword</h1>
      <div className='register'>
                <h1>RESET PASSWORD</h1>

            <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
   
            <input
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="form-control"
            id="exampleInputEmail1"
            placeholder='Enter Your Email'
            required
            />
             </div>

             <div className="mb-3">
   
            <input
            type="text"
            value={answer}
            onChange={(e)=>{setAnswer(e.target.value)}}
            className="form-control"
            id="exampleInputEmail1"
            placeholder='Enter Secret Answer'
            required
            />
            </div>

            <div className="mb-3">
   
            <input
            type="password"
            value={newPassword}
            onChange={(e)=>{setNewPassword(e.target.value)}}
            className="form-control"
            id="exampleInputPassword1"
            placeholder='Enter Your Password'
            required
            />
            </div>

        

        <button type="submit" className="btn btn-primary">
            LOGIN
        </button>

        </form>

            </div>
    </Layout>
  )
}
