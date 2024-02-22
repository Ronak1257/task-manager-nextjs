import mongoose from "mongoose";
import {User} from "../models/user";
const config={
    isConnected:0,
};
export const connectDb =async()=>{
    if(config.isConnected){
        return;
    }
    try{
        const {connection}=await mongoose.connect(process.env.MONGO_DB_URL,{
            dbName:"task_manager",
        });
        config.isConnected=connection.readyState;
        console.log("db connected...");
    }
    catch(err){
        console.log("Faild to connect db");
        console.log(err);
    }
};
