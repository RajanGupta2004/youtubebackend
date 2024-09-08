import jwt from 'jsonwebtoken'




const GenerateToken = (Users) => {


    // access token
    const payload = {
        _id: Users._id,

    }

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })

    // refresh token
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "5d" })


    return Promise.resolve({ accessToken, refreshToken })
}

export default GenerateToken