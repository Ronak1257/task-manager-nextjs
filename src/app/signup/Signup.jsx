"use client";
import React, { useState } from 'react'
import signupBanner from "@/assets/signup.svg";
import Image from 'next/image';
import { signUp } from '@/services/userService';
import { toast } from 'react-toastify';

const Signup = () => {

    const [data,setData]=useState({
        name:"",
        email:"",
        password:"",
        about:"",
        profileURL:"https://static.vecteezy.com/system/resources/thumbnails/030/504/836/small/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg",
    })
    const doSignup=async(event)=>{
        event.preventDefault();
        try{
            const result=await signUp(data);
            console.log(result);
            toast.success("User is registered !",{
                position:'top-center',
            });
            setData({
                name:"",
                email:"",
                password:"",
                about:"",
                profileURL:"https://static.vecteezy.com/system/resources/thumbnails/030/504/836/small/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg", 
            })
        }
        catch(err){
            console.log(err);
            toast.error("SignUp error !! "+ err.response.data.message,{
                position:"top-center",
            })
        }
    }
    const resetForm=()=>{
        setData({
            name:"",
            email:"",
            password:"",
            about:"",
            profileURL:"https://static.vecteezy.com/system/resources/thumbnails/030/504/836/small/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg", 
        });
    }
  return (
    <div className='grid grid-cols-12 '>
        <div className='col-span-4 col-start-5 p-5 '>
            <div className='py-5'>
                <div className='flex justify-center m-5'>
                    <Image src={signupBanner} alt="signup Banner" style={{
                        width:"40%",
                    }}/>
                </div>
                <h1 className='text-3xl text-center'>SignUp Here</h1>
                <form action="#!" className='mt-5' onSubmit={doSignup}>
                    <div className='mt-3'>
                        <label htmlFor='user_name' className='block text-sm font-medium mb-2'>Username</label>
                        <input type="text" className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400
                        border border-gray-800" placeholder='Enter here' id="user_name" name="user_name" onChange={(event)=>{
                            setData({
                            ...data,
                            name:event.target.value,
                            });
                        }}
                        value={data.name}/>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='user_email' className='block text-sm font-medium mb-2'>Email</label>
                        <input type="email" className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400
                        border border-gray-800" placeholder='Enter here' id="user_email" name="user_email" onChange={(event)=>{
                            setData({
                            ...data,
                            email:event.target.value,
                            });
                        }}
                        value={data.email}/>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='user_password' className='block text-sm font-medium mb-2'>Password</label>
                        <input type="password" className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400
                        border border-gray-800" placeholder='Enter here' id="user_password" name="user_password" onChange={(event)=>{
                            setData({
                            ...data,
                            password:event.target.value,
                            });
                        }}
                        value={data.password}/>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='user_about' className='block text-sm font-medium mb-2'>About</label>
                        <textarea className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400
                        border border-gray-800" placeholder='Enter here' id="user_about"
                        rows={4} name="user_about" onChange={(event)=>{
                            setData({
                            ...data,
                            about:event.target.value,
                            });
                        }}
                        value={data.about}></textarea>
                    </div>
                    <div className='mt-4 text-center'>
                    <button type="submit" className='bg-green-600 py-2 px-3 rounded-lg hover:bg-green-400'>Signup</button>
                    <button type="button" onClick={resetForm} className='bg-orange-600 py-2 px-3 rounded-lg hover:bg-orange-400 ms-3'>Reset</button>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup