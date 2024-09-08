import { Users } from "../models/user.model.js"
import { uploadFileOnCloudinary } from "../utils/Cloudinary.js"
import { EncryptPassword } from "../utils/EncryptPassword.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import GenerateToken from "../utils/GenerateToken.js"




export const register = async (req, res) => {
    try {

        // get all data from frontend
        // validate each field
        //check existing user
        // encrypt the password
        //check images for avatar
        // upload image to cloudinary
        // check uploaded successfull
        // remove the refresh token and password
        // return response 

        const { username, email, password, fullName } = req.body

        if (!username || !email || !password || !fullName) {
            return res.status(409).json({
                success: false,
                message: "All field are required"
            })

        }

        const existingUser = await Users.findOne({ $or: [{ username }, { email }] })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already register..."
            })
        }

        // Encrypt the password
        const hashedPassword = await EncryptPassword(password);

        // check file upload on youtube
        // console.log(" milter files details:", req.files)

        const avatarLocalPath = req.files?.avatar[0].path
        // const coverImageLocalPath = req.files?.coverImage[0].path
        // console.log("local path images ", avatarLocalPath, coverImageLocalPath)
        let coverImageLocalPath
        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
            coverImageLocalPath = req.files?.coverImage[0].path

        }


        // check avater local path
        if (!avatarLocalPath) {
            return res.status(409).json({
                success: false,
                message: "Avatar image is required..."
            })
        }

        // check file upload on cloudinary
        const avatar = await uploadFileOnCloudinary(avatarLocalPath)
        const coverImage = await uploadFileOnCloudinary(coverImageLocalPath)
        // console.log("Cloudinary response", avatar, coverImage)

        if (!avatar) {
            return res.status(400).json({
                success: false,
                message: "Avatar image ir required..."
            })
        }

        // craeteboject to send to user


        const user = await Users.create({
            username: username.toLocaleLowerCase(),
            email,
            password: hashedPassword,
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || ""

        })

        const createdUser = await Users.findById(user._id).select("-password -refreshToken")
        if (!createdUser) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong while creating user.."
            })
        }


        return res.status(200).json({
            success: true,
            message: "User created successfully....",
            user: createdUser
        })



    } catch (error) {
        console.log("User Register Error", error)

    }
}



export const login = async (req, res) => {
    // get email and password
    // check email and password send from user
    // find user in dataase
    // compare password
    // generate jwt token access and refresh 
    // set token into cookies
    // send res
    try {

        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(409).json({
                success: false,
                message: "All field are required...."
            })
        }

        const existingUser = await Users.findOne({ $or: [{ email }, { username }] })
        // console.log(existingUser)
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "Your are not registed user....."
            })
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password)
        // console.log("Ismatch", passwordMatch)
        if (!passwordMatch) {
            return res.status(409).json({
                success: false,
                message: "Wronge password..."
            })
        }

        // access token and refreshtoken
        const { accessToken, refreshToken } = await GenerateToken(existingUser)

        // set refreshtoken into database

        existingUser.refreshToken = refreshToken
        existingUser.save()


        const loggedInUser = await Users.findById(existingUser._id).select("-password -refreshToken")
        if (!loggedInUser) {
            return res.status(500).json({
                success: false,
                message: "Something went wronge..."
            })
        }

        // set token into cookies
        const options = {
            httpOnly: true,       // Prevents client-side JavaScript from accessing the cookie
            secure: true,
        }

        return res.status(200).cookie('accessToken', accessToken, options).cookie("refreshToken", refreshToken, options).json({
            success: true,
            message: "Login successfull...",
            loggedInUser,
            accessToken,
            refreshToken
        })




    } catch (error) {
        console.log("ERROR in login", error)
        return res.status(500).json({
            success: false,
            message: "Something went wronge...."
        })

    }
}


