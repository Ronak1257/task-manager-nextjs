import { NextResponse } from "next/server";
import { User } from "@/models/user";
import { connectDb } from "@/helper/db";
// export const GET=()=>{

// }
export async function GET(request,{params}){
    const {userId}=params;
    await connectDb();
    const user=await User.findById(userId).select("-password");
    return NextResponse.json(user);
}
export async function DELETE(request,{params}){
    const {userId}=params;

    try{
        await connectDb();
        await User.deleteOne({
            _id:userId,
        });
        return NextResponse.json({
            message:"user deleted !!",
            success:true,
        });
    }catch(err){
        return NextResponse.json({
            message:"error in deleting user !!",
            success:false,
        });
    }
}

//update user
export async function PUT(request,{params}){
    const {userId}=params;
    const {name,password,about,profileURL}=await request.json();
    try{
        await connectDb();
        const updateUser=await User.updateOne({
            _id:userId,
        },{
            $set:{
                name,
                password,
                about,
                profileURL,
            }
        });
        return NextResponse.json(updateUser);
    }
    catch(err){
        return NextResponse.json({
            message:"error in updating user !!",
            success:false,
        });
    }
}