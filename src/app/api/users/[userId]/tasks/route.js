// api/users/[userId]/tasks

import { connectDb } from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import {Task} from "@/models/task";
import { NextResponse } from "next/server";
export async function GET(request,{params}){
    const {userId}=params;
    try{
        await connectDb();
        const tasks=await Task.find({
            userId:userId,
        });
        return NextResponse.json(tasks);
    }
    catch(err){
        console.log(err);
        return getResponseMessage("failed to get tasks",404,false);
    }
}