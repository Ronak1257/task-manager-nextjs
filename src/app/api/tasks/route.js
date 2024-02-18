import { NextResponse } from "next/server";
import {Task} from "@/models/task";
import { getResponseMessage } from "@/helper/responseMessage";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";
//get all the task
export async function GET(request){
    try{
        await connectDb();
        const tasks=await Task.find();
        return NextResponse.json(tasks);
    }
    catch(err){
        console.log(err);
        return getResponseMessage("failed to get tasks",404,false);
    }
}

//create task
export async function POST(request){
    const {title,content,userId,status}=await request.json();
    //fetching login userid
    const authToken = request.cookies.get("authToken")?.value;
    const data=jwt.verify(authToken,process.env.JWT_KEY);
    try{
        const task=new Task({
            title,
            content,
            userId:data._id,
            status,
        });
        await connectDb();
        const createdTask=await task.save();
        return NextResponse.json(createdTask,{
            status:201,
        });
    }
    catch(err){
        console.log(err);
        return getResponseMessage("failed to create task",404,false);
    }
}