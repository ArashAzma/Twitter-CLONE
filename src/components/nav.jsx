"use client";
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { RiTwitterFill, RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import {useRouter} from "next/navigation"
import Profile from "@/components/profile";
import Link from "next/link";
import Image from "next/image"

const Nav = () => {
  const { data } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between mb-8 pt-[20px] px-8">
      <div>
        <Link href="/">
          <RiTwitterFill className="text-[40px] text-[#1da1f2]" />
        </Link>
      </div>
      {data?.user ? (
        <div className="flex justify-center items-center z-10">
          <div className="flex items-center mr-2 gap-2">
            <Image src={data.user.image} width={25} height={25} alt="404" className="rounded-lg"/>
            <span className="font-light text-sm opacity-50">
              {data.user.name}
            </span>
          </div>
          <Link href="create_tweet" className="hover:text-[#1da1f2] duration-300">Tweet</Link>
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="flex items-center px-4 py-1 rounded-full w-[100px]  focus:outline-none focus:text-[#1da1f2] duration-300 "
              onClick={toggleDropdown}
            >
              Profile 
              {isDropdownOpen?  <RiArrowDropUpFill />: <RiArrowDropDownFill />}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gradient-to-b from-[#1b2730] to-[#06141d] rounded-md shadow-lg z-40">
                <Profile />
              </div>
            )}
          </div>
          <button
            type="button"
            className="bg-[#1da1f2] px-4 py-1 rounded-full w-[100px] hover:bg-blue-600 duration-200"
            onClick={signOut}
          >
            logout
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="bg-[#1da1f2] px-4 py-1 rounded-full w-[100px] hover:bg-blue-600 duration-200"
          onClick={() => signIn()}
        >
          login
        </button>
      )}
    </div>
  );
};

export default Nav;
