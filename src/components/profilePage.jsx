"use client"
import React,{useState} from 'react';
import Card from "@/components/card";
import Link from "next/link";

const ProfilePage = ({name, email, tweets, likedTweets, bookedTweets}) => {
  const [data, setData] = useState(tweets);
  const [dataType, setDataType] = useState("tweets");

  return (
    <div className='flex flex-col gap-4 md:mx-[100px] h-[82vh] overflow-hidden overflow-y-auto items-center'>
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
                      tweet={tweet.tweet}
                      tag={tweet.tag}
                      like={tweet.like}
                      likedBy={tweet.likedBy}
                      type="profile"
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
  )
}

export default ProfilePage