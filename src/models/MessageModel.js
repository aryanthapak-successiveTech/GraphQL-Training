import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    content:{
        type:String,
        required:[true,"Message is required"]
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Author is required"],
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Recipient is required"],
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const messageModel=mongoose.model("Message",messageSchema);

export default messageModel;