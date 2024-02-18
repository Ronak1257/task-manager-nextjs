"use client";
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../api/context/userContext';
import { deleteTask, getTaskOfUser } from '@/services/taskServices';
import Task from './Task';
import { toast } from 'react-toastify';

const ShowTasks = () => {
  const [tasks,setTask]=useState([]);
  const context=useContext(UserContext);
  async function loadTasks(userId){
    try{
      const tasks=await getTaskOfUser(userId);
      setTask([...tasks].reverse())
      console.log(tasks);
    }
    catch(err){
      console.log(err);
    }
  } 
  useEffect(()=>{
    if(context.user){
      loadTasks(context.user._id);
    }
  }, [context.user])

  async function deleteTaskParent(taskId){
    try{
        const result=await deleteTask(taskId);
        console.log(result);
        const newTask=tasks.filter(item=>item._id!=taskId)
        setTask(newTask);
        toast.success("Your Task is deleted !!");
    }catch(err){
      console.log(err);
      toast.error("Error in deleting task");
    }
  }
  return (
    <div className='grid grid-cols-12 mt-4'>
      <div className='col-span-6 col-start-4'>
        <h1 className='text-3xl text-center my-4'>Your Tasks ( {tasks.length} )</h1>
        {tasks.map((task)=>(
          <Task task={task} key={task._id} deleteTaskParent={deleteTaskParent}/>
        ))}
      </div>
    </div>
  )
}

export default ShowTasks