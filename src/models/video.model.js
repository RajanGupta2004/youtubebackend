import mongoose from "mongoose";


const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    },
    views: {
        type: Number,
        required: true
    },
    isPublished: {
        type: Boolean
    }
}, { timestamps: true })

export const Videos = mongoose.model("Videos", videoSchema)