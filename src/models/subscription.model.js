import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }
}, { timestamps: true })


export const Subscription = mongoose.model("Subscription", subscriptionSchema)