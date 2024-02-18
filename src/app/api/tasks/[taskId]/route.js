//api/task/{taskid}

import { connectDb } from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
export async function GET(request,{params}){
    const {taskId}=params;
    try{
        await connectDb();
        const task=await Task.findById(taskId);
        return NextResponse.json(task);
    }catch(err){
        return getResponseMessage("failed to get task",404,false);
    }
}
export async function PUT(request,{params}){
    try{
        await connectDb();
        const {taskId}=params;
        const {title,content,status}=await request.json();
        const updateTask=await Task.updateOne({
            _id:taskId,
        },{
            $set:{
                title,
                content,
                status,
            }
        });
        return NextResponse.json(updateTask);
    }
    catch(err){
        console.log(err);
        return getResponseMessage("failed to update task",500,false);
    }
}
export async function DELETE(request,{params}){
    try{
        await connectDb();
        const {taskId}=params;
        await Task.deleteOne({
            _id:taskId,
        })
        return getResponseMessage("task deleted",200,true);
    }
    catch(err){
        console.log(err);
        return getResponseMessage("failed to delete task",500,false);
    }
}