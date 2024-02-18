"use client";
import UserContext from '@/app/api/context/userContext';
import { logout } from '@/services/userService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { toast } from 'react-toastify';

const CustomNavbar = () => {
    const context=useContext(UserContext);
    const router=useRouter();
    async function doLogout(){
        try{
            const result=await logout();
            console.log(result);
            context.setUser(undefined);
            router.push("/")
        }
        catch(err){
            toast.error("Logout Error")
        }
    }
  return (
    <nav className="bg-blue-600 h-16 py-2 px-9 flex justify-between items-center">
        <div className="brand">
            <h1 className='text-2xl font-semibold'><a href="#!">Work manager</a></h1>
        </div>
        <div>
            <ul className='flex space-x-5'>
                {
                    context.user && (
                        <>
                        <li>
                            <Link href={"/"} className='hover:text-blue-100'>Home</Link>
                        </li>
                        <li>
                            <Link href={"/add-task"} className='hover:text-blue-100'>Add Task</Link>
                        </li>
                        <li>
                            <Link href={"/show-task"} className='hover:text-blue-100'>Show Task</Link>
                        </li>
                        </>
                    )
                }
            </ul>
        </div>
        <div>
            <ul className='flex space-x-5'>
                {context.user && (
                    <>
                    <li>
                        <Link href={"#"}>{context.user.name}</Link>  
                    </li>
                    <li>
                        <button onClick={doLogout}>Logout</button>  
                    </li>
                    </>
                )}
                {!context.user && (
                    <>
                    <li>
                        <Link href="/login">Login</Link>  
                    </li>
                    <li>
                        <Link href="/signup">Sign Up</Link>  
                    </li>
                    </>
                )}
            </ul>
        </div>
    </nav>
  );
};

export default CustomNavbar