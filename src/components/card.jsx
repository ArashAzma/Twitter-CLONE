"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  RiHeartFill,
  RiHeartLine,
  RiBookmarkLine,
  RiMoreLine,
} from "react-icons/ri";

const Card = ({
  name,
  image,
  tweet,
  tag,
  id,
  type,
  tagClick,
  like: likeCount,
  likedBy,
}) => {
  const session = useSession();
  const router = useRouter();
  const [dropOpen, setDropOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likeCount);
  useEffect(() => {
    if (session && likedBy.includes(session.data?.user.id)) {
      setIsLiked(true);
    }
  }, [session, likedBy]);

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
          setLikes(likeCount);
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
            setLikes(likeCount);
          console.log(res)
        }
      }
    } catch (error) {
      console.log(error);
      setIsLiked(!isLiked);
      setLikes(likeCount);
    }
  };

  return (
    <div
      className="flex flex-col bg-[#1b2730] w-[400px] 
    md:w-[500px] rounded-[12px] p-6 gap-y-4 relative"
    >
      {type == "profile" && (
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
        <div className="opacity-70">@{name}</div>
      </div>
      <div className="flex flex-col justify-between ">
        <div className="">{tweet}</div>
        <div className="flex justify-between mt-6">
          <div className="flex text-xl gap-x-3 justify-center ">
            <div onClick={handleLike}>
              {isLiked ? (
                <RiHeartFill className="text-red-600 cursor-pointer" />
              ) : (
                <RiHeartLine className="cursor-pointer" />
              )}
            </div>
            {likes > 0 && <p className="text-sm">{likes}</p>}
            <RiBookmarkLine />
          </div>
          <div
            className=" text-sm text-[#1da1f2] cursor-pointer"
            onClick={() => tagClick(tag)}
          >
            {tag}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;