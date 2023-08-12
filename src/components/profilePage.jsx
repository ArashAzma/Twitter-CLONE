"use client"
import React,{useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { RiBallPenFill, RiCloseFill } from "react-icons/ri";
import Card from "@/components/card";
import Link from "next/link";
import Image from "next/image";

const ProfilePage = ({user, tweets, likedTweets, bookedTweets}) => {
  const [data, setData] = useState(tweets);
  const [dataType, setDataType] = useState("tweets");
  const [bioOpen, setBioOpen] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [bio, setBio] = useState("");
  const {data:session} = useSession(); 

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setBioOpen(!bioOpen)
  };
  const handleBio = async(e)=>{
    e.preventDefault();
    try{
      const res = await fetch(`/api/users/${user._id}`,{
        method:"PATCH",
        body:JSON.stringify({
          bio:bio
        })
      })
      if(res.ok){
        console.log("Updated Bio")
        setBioOpen(false);
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="flex flex-col lg:flex-row-reverse  lg:items-start px-[75px] items-center justify-end gap-y-8 relative">
      <div className='flex flex-col gap-4 md:mx-[75px] max-h-[82vh] overflow-hidden overflow-y-auto items-center'>
          <div className="grid grid-cols-3 gap-4 divide-x divide-gray-400  items-center bg-[#1b2730] mx-6 py-2 rounded-xl w-[400px] md:w-[500px]">
            <button onClick={()=>{setData(tweets); setDataType("tweets")}} className="focus:opacity-100 focus:text-[#1da1f2] opacity-40 duration-200 ">tweets</button>
            <button onClick={()=>{setData(likedTweets); setDataType("liked tweet")}}className="focus:opacity-100 focus:text-[#1da1f2] opacity-40 duration-200 ">likes</button>
            <button onClick={()=>{setData(bookedTweets); setDataType("bookmarks")}}className="focus:opacity-100 focus:text-[#1da1f2] opacity-40 duration-200 ">bookmarks</button>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            {data.length!==0? data.map((tweet)=> {
                return <Card 
                        key={tweet._id}
                        id={tweet._id}
                        name={tweet.creator.username}
                        image={tweet.creator.image}
                        accId={tweet.creator._id}
                        tweet={tweet.tweet}
                        tag={tweet.tag}
                        like={tweet.like}
                        likedBy={tweet.likedBy}
                        bookedBy={tweet.bookedBy}
                        type={dataType}
                    />
            }) :
            <div className="flex w-[400px] md:w-[500px] h-[400px] justify-center items-center"> 
              <div>
                {dataType=="tweets"
                ? <div className="flex flex-col justify-center items-center">
                  <p className="font-medium ">you don't have any tweets right now</p>
                  <Link href="/create_tweet" className="hover:scale-105 smooth duration-150 text-[#1da1f2] underline font-bold">MAKE your FIRST tweet</Link>
                  </div>
                :  <div className="flex flex-col justify-center items-center">
                <p className="font-medium ">you don't have any {dataType} right now</p>
                </div>
                }
              </div>
            </div>  
          }
          </div>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="w-[300px] h-[275px] bg-[#1b2730] rounded-xl ">
          {user
          ? <div className="flex flex-col items-center p-6 relative">
              {<Image src={user.image} width={75} height={75} className="rounded-xl absolute -top-4" alt="user"/>}
              <div className="absolute top-24 ">
                <div className="flex gap-x-2 mb-1 justify-between items-center">
                  <div className="opacity-50">username :</div>
                  <div className="opacity-90 font-bold">{user.username}</div>
                </div>
                <div className="flex gap-x-2 mb-3 justify-between items-center">
                  <div className="opacity-50">email :</div>
                  <div className="opacity-90 font-bold">{user.email}</div>
                </div>
                <div className="flex gap-x-2 mb-5 justify-between items-center">
                  <div className="opacity-50 text-sm">bio :</div>
                  <div className="flex gap-2">
                    {user.bio 
                      ?<div className="opacity-70 text-xs font-medium">{user.bio}</div>
                      :<div className="opacity-70 font-light text-xs flex items-center gap-x-3">Bio is Empty !</div>
                    }
                    {user._id == session.user.id && <RiBallPenFill onClick={handleClose} className="text-[17px] text-[#1da1f2] hover:text-sky-600 cursor-pointer "/>}
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-400  gap-x-2 mb-3 justify-between items-center">
                  <div className="flex flex-col items-center justify-center opacity-50">
                    <div>
                      Following :
                    </div>
                    <div>
                      {user.followers.length}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center opacity-50">
                    <div>
                      Followers :
                    </div>
                    <div>
                      {user.following.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          : <div>
              LOading
            </div>
          }
          </div>
          {user._id != session.user.id && <div>
            {!isFollowed
            ?<button className=" w-[300px] bg-sky-500 px-2 py-1 rounded-lg">Follow</button>
            :<button className=" w-[300px] bg-gray-500 px-2 py-1 rounded-lg">Unfollow</button>
            }
          </div>}

      </div>
        {bioOpen &&
          <> 
            <div className="fixed inset-0 bg-[#1b2730] opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[400px] h-[200px] bg-[#06141d] rounded-xl flex items-center justify-center">
              <button onClick={handleClose}className="absolute right-5 top-4 hover:text-red-800 duration-200 text-lg">
                < RiCloseFill/>
              </button>
              <form onSubmit={handleBio} className="flex flex-col gap-4 items-start justify-center">
                <input 
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    type='text'
                    required
                    placeholder="Enter your bio"
                    className="bg-transparent border-b-2 px-2 py-1 border-gray-200"
                />
                <button type="submit" className="bg-green-700 rounded-lg w-[150px] opacity-70 hover:opacity-90 duration-200">submit</button>
              </form>
            </div>
          </> 
        }
    </div>
  )
}

export default ProfilePage