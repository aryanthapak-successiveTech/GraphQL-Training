import mongoose from "mongoose"

const postSchema=new mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    description:{
        type:String,
    },
    comments:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Comment"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const postModel=mongoose.model("Post",postSchema);

export default postModel;
