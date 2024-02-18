import { User } from "@/models/user";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs";
import { connectDb } from "@/helper/db";
export async function GET(request){
    let users=[];
    try{
        await connectDb();
        users=await User.find().select("-password");
    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            message:"failed to get users",
            success:false,
        });
    }
    return NextResponse.json(users);
}
export async function POST(request){
    //fetch userdetail from request
    const {name,email,password,about,profileURL}=await request.json();
    //create new user
    const user=new User({
        name,
        email,
        password,
        about,
        profileURL,
    });
    try{
        user.password=bcrypt.hashSync(user.password,parseInt(process.env.BCRYPT_SALT));
        await connectDb();
        const createUser=await user.save();
        const response=NextResponse.json(user,{
            status:201,
        });
        return response;
    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            message:"failed to create user",
            status:false,
        },{
            status:500,
        });
    }
}