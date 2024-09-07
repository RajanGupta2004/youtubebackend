import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({

        cloud_name: 'dpj2nvdh1', 
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUDINARY_SECRET_KEY  // Click 'View API Keys' above to copy your API secret

})





export const uploadFileOnCloudinary = async (localfilePath) => {
    try {

        if(!localfilePath){
            return null
        }
       const response =  await cloudinary.uploader.upload(localfilePath , {
            resource_type:"auto"
        })
        fs.unlinkSync(localfilePath)
        
        return response
        
    } catch (error) {
        fs.unlinkSync(localfilePath)
        console.log("cloudinary file path error" , error)
        return null
        
    }
}


// import { v2 as cloudinary } from 'cloudinary';

// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: 'dpj2nvdh1', 
//         api_key: '224419375269472', 
//         api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();