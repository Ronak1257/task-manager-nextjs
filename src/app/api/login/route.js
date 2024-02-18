import { connectDb } from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request){
    const {email,password}=await request.json();
    try{
        await connectDb();
        // 1. get user
        const user=await User.findOne({
            email:email,
        });
        if(user==null){
            throw new Error("user not found !!");
        }

        //2. check password
        const matched=bcrypt.compareSync(password,user.password)
        if(!matched){
            throw new Error("Password not matched !!");
        }

        //3. generate token
        const token=jwt.sign({
            _id:user._id,
            name:user.name,
        },process.env.JWT_KEY);

        //4. create nextresponse --> cookie
        const response=NextResponse.json({
            message:"Login success !!",
            success:true,
            user:user,
        })
        response.cookies.set("authToken",token,{
            expiresIn :"1d",
            httpOnly:true,
        })

        console.log(user);
        console.log(token);
        return response;
    }
    catch(err){
        console.log(err);
        return getResponseMessage(err.message,500,false);
    }
}