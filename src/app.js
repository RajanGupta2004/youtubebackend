import express from "express"
import dotenv from 'dotenv'
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from './db/index.js'
import userRoutes from "./routes/user.routes.js"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// middleware
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// All api routes

app.use("/api/v1", userRoutes)



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })





// http://localhost:8000/api/v1/users/register

