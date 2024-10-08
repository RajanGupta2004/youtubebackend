import exppress from 'express'
import { changePassword, getCurrrentUser, login, logout, refreshToken, register, updateAvatarImage, updateCoverImage } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { verifyToken } from '../middlewares/auth.middleware.js'


const router = exppress.Router()


router.post('/register', upload.fields([{ name: "avatar", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), register)
router.post("/login", login)

// procted routes

router.post("/logout", verifyToken, logout)
router.post("/refreshtoken", refreshToken)
router.post("/current-user", verifyToken, getCurrrentUser)
router.post("/change-password", verifyToken, changePassword)
router.post("/update-avatar", verifyToken, upload.single('avatar'), updateAvatarImage)
router.post("/update-coverImage", verifyToken, upload.single("coverImage"), updateCoverImage)





export default router


// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// app.post('/cool-profile', cpUpload, function (req, res, next) {
//     // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//     //
//     // e.g.
//     //  req.files['avatar'][0] -> File
//     //  req.files['gallery'] -> Array
//     //
//     // req.body will contain the text fields, if there were any
// })