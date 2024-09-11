
import jwt from 'jsonwebtoken'
import { Users } from '../models/user.model.js'




export const verifyToken = async (req, res, next) => {

    try {

        // console.log("Cookies", req.cookies)

        const token = req.cookies.accessToken || req.header("Authorization").replace("Bearer ", "")
        // console.log(token)


        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token...."
            })
        }

        const user = await Users.findById(decodedToken._id).select("-password -refreshToken")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid acckessToken"
            })
        }


        req.user = user
        next()

    } catch (error) {
        console.log("ERROR on Token Verifucation", error)

    }
}