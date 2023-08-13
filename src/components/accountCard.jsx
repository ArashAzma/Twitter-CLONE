"use client";
import React, { useState, useEffect } from "react";
import {useRouter} from 'next/navigation';
import Image from "next/image";

const AccountCard = ({ image, name, userId, acc, Acc }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isFollowed = async () => {
      const followed = Acc.followers.includes(userId);
      if (followed) {
        setIsFollowed(true);
      }
    };
    if (userId) isFollowed();
  }, [userId]);

  const handleFollow = async () => {
    setIsFollowed(true);
    try {
      const res = await fetch(`/api/users/${userId}/follow`, {
        method: "PATCH",
        body: JSON.stringify({
          acc,
          action: "follow",
        }),
      });
      if (res.ok) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      setIsFollowed(false);
    }
  };
  const handleUnfollow = async () => {
    setIsFollowed(false);
    try {
      const res = await fetch(`/api/users/${userId}/follow`, {
        method: "PATCH",
        body: JSON.stringify({
          acc,
          action: "unfollow",
        }),
      });
      if (res.ok) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      setIsFollowed(true);
    }
  };

  const handleUsername = async(e) => {
    e.preventDefault();
    router.push(`/profile/${acc}`);
  }
  return (
    <div className="flex relative w-full h-[40px] pr-2 py-2 bg-[#1b2730] rounded-r-lg items-center justify-between hover:scale-105 transition-all ease-in-out duration-200">
      <div className="flex gap-x-3 items-center">
        <Image
          src={image}
          width={50}
          height={50}
          className="absolute -left-1 rounded-full"
          alt="404"
        />
        <div onClick={handleUsername} className="absolute text-[14px] left-16 opacity-70 hover:text-[#1da1f2] duration-200 cursor-pointer">
          @{name}
        </div>
      </div>
      <div className="text-[14px] opacity-90">
        {(userId && userId!=acc) &&
          (!isFollowed ? (
            <button
              onClick={handleFollow}
              className=" w-[100px] bg-sky-500 hover:bg-gray-500 duration-200 px-2 py-1 rounded-lg"
            >
              Follow
            </button>
          ) : (
            <button
              onClick={handleUnfollow}
              className=" w-[100px] bg-gray-500 hover:bg-sky-500 duration-200 px-2 py-1 rounded-lg"
            >
              Unfollow
            </button>
          ))}
      </div>
    </div>
  );
};

export default AccountCard;
