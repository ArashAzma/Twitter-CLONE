"use client"
import React,{useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { RiBallPenFill, RiCloseFill } from "react-icons/ri";
import Card from "@/components/card";
import Link from "next/link";
import Image from "next/image";
import AccountCard from "@/components/accountCard";

const ProfilePage = ({user, tweets, likedTweets, bookedTweets}) => {
  const [data, setData] = useState(tweets);
  const [dataType, setDataType] = useState("tweets");
  const [bioOpen, setBioOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [bio, setBio] = useState("");
  const {data:session} = useSession(); 

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    const isFollowed = async() => {
      const followed = user.followers.some(follower => follower._id === session.user.id);
      if(followed){
        setIsFollowed(true);
      }
    };

    if(session?.user) isFollowed();
  },[session?.user && user])

  const handleBioClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setBioOpen(!bioOpen)
  };
  const handleFollowingClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFollowingOpen(!followingOpen)
  };
  const handleFollowersClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFollowersOpen(!followersOpen)
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
  const handleFollow = async() => {
      setIsFollowed(true)
      const USER= session?.user.id;
      const acc = user._id;
      console.log(USER);
      console.log(acc);
      try {
        const res = await fetch(`/api/users/${USER}/follow`,{
          method:"PATCH",
          body:JSON.stringify({
            acc,
            action:"follow"
          })
        })
        if(res.ok){
          console.log(res);
        }
      } catch (error) {
        console.log(error);
        setIsFollowed(false)
      }
  }
  const handleUnfollow = async() => {
      setIsFollowed(false)
      const USER= session?.user.id;
      const acc = user._id;
      try {
        const res = await fetch(`/api/users/${USER}/follow`,{
          method:"PATCH",
          body:JSON.stringify({
            acc,
            action:"unfollow"
          })
        })
        if(res.ok){
          console.log(res);
        }
      } catch (error) {
        console.log(error);
        setIsFollowed(true)
      }
  }
  return (
    <div className="flex flex-col lg:flex-row-reverse  lg:items-start px-[75px] items-center justify-end gap-y-8 relative">
      <div className='flex flex-col gap-4 md:mx-[75px] max-h-[82vh] items-center mx-6 relative'>
          <div className="absolute grid grid-cols-3 gap-4 divide-x divide-gray-400 items-center bg-[#1b2730] py-2 rounded-xl w-[400px] md:w-[500px]">
            <button onClick={()=>{setData(tweets); setDataType("tweets")}} className="focus:opacity-100 focus:text-[#1da1f2] opacity-40 duration-200 ">tweets</button>
            <button onClick={()=>{setData(likedTweets); setDataType("liked tweet")}}className="focus:opacity-100 focus:text-[#1da1f2] opacity-40 duration-200 ">likes</button>
            <button onClick={()=>{setData(bookedTweets); setDataType("bookmarks")}}className="focus:opacity-100 focus:text-[#1da1f2] opacity-40 duration-200 ">bookmarks</button>
          </div>
          <div className="flex flex-col gap-4 justify-start mt-16 overflow-hidden overflow-y-auto">
            {data.length!==0? data.map((tweet)=> {
                return <Card 
                        key={tweet._id}
                        id={tweet._id}
                        name={tweet.creator.username}
                        image={tweet.creator.image}
                        accId={tweet.creator._id}
                        tweet={tweet.tweet}
                        tag={tweet.tag}
                        likedBy={tweet.likedBy}
                        bookedBy={tweet.bookedBy}
                        type={dataType}
                        tagClick={()=>{}}
                    />
            }) :
            <div className="flex w-[400px] md:w-[500px] h-[400px] justify-center items-center"> 
              <div>
                {dataType=="tweets"
                ? <div className="flex flex-col justify-center items-center">
                  <p className="font-medium ">Tweets is Empty</p>
                  <Link href="/create_tweet" className="hover:scale-105 smooth duration-150 text-[#1da1f2] underline font-bold">MAKE your FIRST tweet</Link>
                  </div>
                :  <div className="flex flex-col justify-center items-center">
                <p className="font-medium ">{dataType} is Empty</p>
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
                    {user._id == session?.user.id && <RiBallPenFill onClick={handleBioClose} className="text-[17px] text-[#1da1f2] hover:text-sky-600 cursor-pointer "/>}
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-400  gap-x-2 mb-3 justify-between items-center">
                  <div onClick={handleFollowingClose} className="flex flex-col items-center justify-center opacity-50 hover:opacity-90 cursor-pointer">
                    <div>
                      Following :
                    </div>
                    <div>
                      {user.following.length}
                    </div>
                  </div>
                  <div onClick={handleFollowersClose} className="flex flex-col items-center justify-center opacity-50 hover:opacity-90 cursor-pointer">
                    <div>
                      Followers :
                    </div>
                    <div>
                      {user.followers.length}
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
          {(user?._id != session?.user.id && session) && <div>
            {!isFollowed
            ?<button onClick={handleFollow} className=" w-[300px] bg-sky-500 px-2 py-1 rounded-lg">Follow</button>
            :<button onClick={handleUnfollow} className=" w-[300px] bg-gray-500 px-2 py-1 rounded-lg">Unfollow</button>
            }
          </div>}

      </div>
        {bioOpen &&
          <> 
            <div className="fixed inset-0 bg-[#1b2730] opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[400px] h-[200px] bg-[#06141d] rounded-xl flex items-center justify-center">
              <button onClick={handleBioClose}className="absolute right-5 top-4 hover:text-red-800 duration-200 text-lg">
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
        {followingOpen &&
          <> 
            <div className="z-20 fixed inset-0 bg-[#1b2730] opacity-50"></div>
            <div className="flex-col z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[400px] h-[400px] bg-[#06141d] rounded-xl flex items-center justify-start gap-y-6 p-12 overflow-hidden overflow-y-auto">
              <button onClick={handleFollowingClose} className="absolute right-5 top-4 hover:text-red-800 duration-200 text-lg">  < RiCloseFill/>   </button>
                {user.following.map((data)=> {
                  return <AccountCard key={data._id} name = {data.username} image={data.image} userId={session?.user.id} acc={data._id} Acc={data}/>
                })}
            </div>
          </> 
        }
        {followersOpen &&
          <> 
            <div className="z-20 fixed inset-0 bg-[#1b2730] opacity-50"></div>
            <div className="flex-col z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[400px] h-[400px] bg-[#06141d] rounded-xl flex items-center justify-start gap-y-6 p-12 overflow-hidden overflow-y-auto">
              <button onClick={handleFollowersClose} className="absolute right-5 top-4 hover:text-red-800 duration-200 text-lg">  < RiCloseFill/>   </button>
                {user.followers.map((data)=> {
                  return <AccountCard key={data._id} name = {data.username} image={data.image} userId={session?.user.id} acc={data._id} Acc={data}/>
                })}
            </div>
          </> 
        }
    </div>
  )
}

export default ProfilePage