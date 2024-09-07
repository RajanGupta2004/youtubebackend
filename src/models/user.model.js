


import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        fullName: {
            type: String,
            required: true,
            index: true
        },
        avatar: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        refreshToken: {
            type: String,
            trim: true
        },

        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Videos"
            }
        ]
    }

    ,
    { timestamps: true }
)

userSchema.pre('save', async function (password) {
    userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) return next();

        this.password = await bcrypt.hash(this.password, 10)
        next()
    })

})


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}


export const Users = mongoose.model("Users", userSchema)