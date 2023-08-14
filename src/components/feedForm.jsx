"use client"
import { RiCheckFill } from "react-icons/ri";
import Image from 'next/image';
import React from "react";
import { useSession } from "next-auth/react";
const Form = ({ type, tweet, setTweet, handleSubmit }) => {
  const {data} = useSession();
  return <div>
            <form onSubmit={handleSubmit} className="flex w-[550px] gap-x-4 p-1 bg-[#1b2730] rounded-lg items-center justify-center">
                    <Image src={data?.user.image} height={35} width={35} alt="404" className="rounded-full"/>
                    <input 
                        value={tweet.body}
                        onChange={(e)=> setTweet({...tweet, body:e.target.value})}
                        placeholder="  Whats happening? "
                        required
                        className="w-[400px] h-[40px] rounded-xl bg-gray-600 bg-opacity-60"
                    />
                    <button
                        type='submit'
                        className='flex w-[45px] h-[25px] rounded-full 
                        bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-900
                        duration-300 smooth hover:scale-105 items-center justify-center text-lg font-bold'
                    >
                        <RiCheckFill />
                    </button>
            </form>
        </div>; 
};

export default Form;
