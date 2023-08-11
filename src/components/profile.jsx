"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RiSettings3Line } from "react-icons/ri";
import { useSession } from 'next-auth/react'

const Profile = () => {
    const {data} = useSession();
  return (
    <div className="flex w-[240px] justify-center text-center p-6 z-60 relative">
        <div className="flex flex-col justify-center items-center gap-y-6">
            <div className="flex flex-col items-center gap-2">
                <Image src={data.user.image} width={42} height={42} alt="user" className="rounded-[12px]"/>
                <Link href="/profile" className="absolute top-3 right-3 text-lg font-light opacity-40 hover:text-[#1da1f2] hover:opacity-80 transition-all duration-300"><RiSettings3Line/></Link>
            </div>
            <div>
                {data.user.name}
                <div className="font-light text-sm opacity-70">
                    {data.user.email}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile;