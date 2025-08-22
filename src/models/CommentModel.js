import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    commentedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    text:{
        type:String,
        required:[true,"Comment text is required"],
    }
})

const commentModel=mongoose.model("Comment",commentSchema);

export default commentModel;