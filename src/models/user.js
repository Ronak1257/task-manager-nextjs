import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:[true,"Email reuired !!"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password required !!"],
    },
    about:String,
    profileURL:String,
});

export const User = mongoose.models.users || mongoose.model("users",userSchema);