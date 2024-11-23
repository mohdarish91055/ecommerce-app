import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'

//rest object 
const app = express()
app.use(cors())

//database config 
connectDB() 

//dotenv configure
dotenv.config()

//middeleares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

//rest api
app.get('/',(req,res)=>{
    res.send('<h1>hello world</h1>')
})


//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(8000,()=>{
    console.log(`server running on ${process.env.DEV_MODE} onport ${PORT}`)
})