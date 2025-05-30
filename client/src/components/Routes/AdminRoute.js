import {useState,useEffect} from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner'
import API from '../../api/api'

export default function AdminRoute(){
    const [ok,setOk]=useState(false)
    const [auth,setAuth] = useAuth()

    useEffect(()=>{
        const authCheck = async()=>{
            const res = await API.get(`/api/v1/auth/admin-auth`)
            if(res.data.ok){
                setOk(true)
        
            }
            else{
                setOk(false)
            }
        }
        
        if(auth?.token) authCheck()

        },[auth?.token])
       
    return ok ?<Outlet/>:<Spinner path='/'/>
}