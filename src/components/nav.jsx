"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession} from "next-auth/react";
import { RiTwitterFill, RiMenu3Fill } from "react-icons/ri";
import AccountMenu from "./accountMenu";
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
    <div className="flex justify-between mb-8 pt-[20px] px-8 z-10">
      <div>
        <Link href="/">
          <RiTwitterFill className="text-[40px] text-[#1da1f2]" />
        </Link>
      </div>
      {data?.user ? (
        <div className="flex justify-center items-center z-10 gap-x-4">
          <Link href="create_tweet" className="hover:text-[#1da1f2] duration-300">Tweet</Link>
          < RiMenu3Fill onClick={toggleDropdown} className="text-lg hover:text-[#1da1f2] hover:scale-110 duration-300 cursor-pointer"/>
          {isDropdownOpen && 
            <>
              <div className="-z-10 fixed inset-0 bg-black opacity-50"></div>
              < AccountMenu image={data.user.image} email={data.user.email} name={data.user.name} onClick={toggleDropdown}/>
            </>
          }
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
