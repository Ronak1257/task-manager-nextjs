"use client";
import { login } from '@/services/userService';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import UserContext from '../api/context/userContext';

const Login = () => {
    const router=useRouter();
    const context=useContext(UserContext);
    const [loginData,setLoginData]=useState({
        email:"",
        password:"",
    })

    const loginFormSubmitted=async (event)=>{
        event.preventDefault();
        if(loginData.email.trim()==="" || loginData.password.trim()===""){
            toast.info("Invalid Data",{
                position:"top-center",
            })
        }
        try{
            const result=await login(loginData);
            console.log(result);
            toast.success("Logged In");
            //redirect
            context.setUser(result.user);
            router.push("/profile");
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message,{
                position:"top-center",
            })
        }
    }
  return (
    <div className='grid grid-cols-12 '>
        <div className='col-span-4 col-start-5 p-5 '>
            <div className='py-5'></div>
            <h1 className='text-3xl text-center'>Login Here</h1>
            <form action="#!" className='' onSubmit={loginFormSubmitted}>
                <div className='mt-3'>
                    <label htmlFor='user_email' className='block text-sm font-medium mb-2'>Email</label>
                    <input type="email" className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400 border border-gray-800" placeholder='Enter here' id="user_email" name="user_email" onChange={(event)=>{
                        setLoginData({
                        ...loginData,
                        email:event.target.value,
                        });
                    }}
                    value={loginData.email}/>
                </div>
                <div className='mt-3'>
                    <label htmlFor='user_password' className='block text-sm font-medium mb-2'>Password</label>
                    <input type="password" className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400
                    border border-gray-800" placeholder='Enter here' id="user_password" name="user_password" onChange={(event)=>{
                        setLoginData({
                        ...loginData,
                        password:event.target.value,
                        });
                    }}
                    value={loginData.password}/>
                </div>
                <div className='mt-4 text-center'>
                    <button type="submit" className='bg-green-600 py-2 px-3 rounded-lg hover:bg-green-400'>Login</button>
                    <button type="button" className='bg-orange-600 py-2 px-3 rounded-lg hover:bg-orange-400 ms-3'>Reset</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login