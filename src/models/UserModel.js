import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, "User name must be provided"],
  },
  password: {
    type: String,
    required: [true, "Password must be provided"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email must be provided"],
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
  },
  conversations:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Conversation"
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  role:{
    type:String,
    enum:["ADMIN","USER"],
    default:"USER"
  }
  
});

userSchema.pre("save",async function(next){
  this.password=await bcrypt.hash(this.password,12);
  next();
})

const userModel=mongoose.model("User",userSchema);

export default userModel;
