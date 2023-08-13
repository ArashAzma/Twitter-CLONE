"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AccountCard from "@/components/accountCard";
import {
  RiCloseFill,
  RiHeartFill,
  RiHeartLine,
  RiBookmarkLine,
  RiBookmarkFill,
  RiMoreLine,
} from "react-icons/ri";

const Card = ({
  name,
  image,
  tweet,
  accId,
  tag,
  id,
  type,
  tagClick,
  likedBy,
  bookedBy,
}) => {
  const session = useSession();
  const router = useRouter();
  const [dropOpen, setDropOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [likeOpen, setLikeOpen] = useState(false);
  const [likes, setLikes] = useState(likedBy.length);

  useEffect(() => {
    if (session && likedBy.some((data) => data._id== session.data?.user.id)) {
      setIsLiked(true);
    }
    if (session && bookedBy.includes(session.data?.user.id)) {
      setIsBooked(true);
    }
  }, [session, likedBy, bookedBy]);

  const handleLikeClose = () => {
    console.log(likedBy)
    setLikeOpen(!likeOpen);
  }
  const handleDelete = async () => {
    console.log(id);
    try {
      const res = await fetch(`/api/tweet/${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("OK");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = async (id) => {
    router.push(`/edit_tweet?id=${id}`);
  };
  const handleLike = async (e) => {
    e.preventDefault();
    try {
      if (isLiked) {
        setIsLiked(!isLiked);
        setLikes(likes-1);
        const res = await fetch(`api/tweet/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            action: "removelike",
            tweet: "",
            tag: "",
            userId: session.data?.user.id,
          }),
        });
        if(res.ok){
          console.log("REMOVED");
        }else{
          setLikes(likedBy.length);
          console.log(res)
        }
      } else {
        setIsLiked(!isLiked);
        setLikes(likes+1);
        console.log(session.data?.user.id)
        const res = await fetch(`api/tweet/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            action: "addlike",
            tweet: "",
            tag: "",
            userId: session.data?.user.id,
          }),
        });
        if(res.ok){
          console.log("ADDED");
        }else{
            setLikes(likedBy.length);
          console.log(res)
        }
      }
    } catch (error) {
      console.log(error);
      setIsLiked(!isLiked);
      setLikes(likedBy.length);
    }
  };
  const handleBookmark = async(e) => {
    e.preventDefault();
    try {
      if(!isBooked){
        setIsBooked(true)
        const res = await fetch(`api/tweet/${id}`,{
          method:"PATCH",
          body:JSON.stringify({
            action: "addBookmark",
            tweet: "",
            tag: "",
            userId: session.data?.user.id,
          })
        })
        if(res.ok){
          console.log("BOOKED");
        }else{
          console.log(res);
          setIsBooked(false);
        }
      }else{
        setIsBooked(false);
        const res = await fetch(`api/tweet/${id}`,{
          method:"PATCH",
          body:JSON.stringify({
            action: "removeBookmark",
            tweet: "",
            tag: "",
            userId: session.data?.user.id,
          })
        })
        if(res.ok){
          console.log("REMOVED BOOKED");
        }else{
          console.log(res);
          setIsBooked(true);
        }

      }


    } catch (error) {
      console.log(error);
    }
  }
  const handleUsername = async(e) => {
    router.push(`/profile/${accId}`);
  }
  return (
    <div
      className="flex flex-col bg-[#1b2730] w-[400px] 
    md:w-[500px] rounded-[12px] p-6 gap-y-4 "
    >
      {(type == "tweets" && session.data?.user.id==accId) && (
        <div className="relative">
          <div
            onClick={() => setDropOpen(!dropOpen)}
            className="absolute -top-2 right-0 text-xl hover:text-[#1da1f2] duration-300 cursor-pointer"
          >
            <RiMoreLine />
          </div>
          {dropOpen && (
            <div className="absolute flex bg-[#06141d] w-[200px] p-6 right-5 top-3 items-start rounded-lg">
              <ul
                role="list"
                className="marker:text-[#1da1f2] list-disc pl-5 space-y-3 text-slate-400 cursor-pointer"
              >
                <li
                  onClick={handleDelete}
                  className="hover:text-red-600 duration-200"
                >
                  Delete
                </li>
                <li
                  onClick={() => handleEdit(id)}
                  className="hover:text-[#1da1f2] duration-200"
                >
                  Edit
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
      <div className="flex gap-x-2 items-center text-sm font-light">
        <Image
          src={image}
          width={32}
          height={32}
          alt="User"
          className="rounded-[12px]"
        />
        <div onClick={handleUsername} className="opacity-70 cursor-pointer">@{name}</div>
      </div>
      <div className="flex flex-col justify-between ">
        <div className="">{tweet}</div>
        <div className="flex justify-between mt-6">
          <div className="flex text-xl gap-x-4 justify-center ">
            <div className="flex gap-x-2">
              <div onClick={handleLike}>
                {isLiked ? (
                  <RiHeartFill className="text-red-600 cursor-pointer" />
                ) : (
                  <RiHeartLine className="cursor-pointer hover:text-red-600 duration-200 "/>
                )}
              </div>
              {likes > 0 && <p onClick={handleLikeClose} className="cursor-pointer text-sm">{likes}</p>}
            </div>
            <div onClick={handleBookmark} className="flex cursor-pointer items-center text-[16px]">
              {isBooked? <RiBookmarkFill /> : <RiBookmarkLine />}
            </div>
          </div>
          <div
            className=" text-sm text-[#1da1f2] cursor-pointer"
            onClick={() => tagClick(tag)}
          >
            {tag}
          </div>
        </div>
      </div>
      {likeOpen &&
          <> 
            <div className="z-20 fixed inset-0 bg-[#1b2730] opacity-50"></div>
            <div className="flex-col z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[400px] h-[400px] bg-[#06141d] rounded-xl flex items-center justify-start gap-y-6 p-12 overflow-hidden overflow-y-auto">
              <button onClick={handleLikeClose} className="absolute right-5 top-4 hover:text-red-800 duration-200 text-lg">  < RiCloseFill/>   </button>
                {likedBy.map((data)=> {
                  return <AccountCard key={data._id} name = {data.username} image={data.image} userId={session.data.user.id} acc={data._id} Acc={data}/>
                })}
            </div>
          </> 
        }
    </div>
  );
};

export default Card;