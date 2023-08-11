"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {useRouter} from 'next/navigation'
import ProfilePage from '@/components/profilePage';
import ReactLoading from "react-loading";

const Profile = () => {
  const { status, data } = useSession();
  const [tweets, setTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [bookedTweets, setBookedTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  if(status==="unauthenticated"){
    router.push("/");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/${data.user.id}/tweets`);
        const body = await res.json();
        setTweets(body.tweets);
        setLikedTweets(body.likedTweets);
        setLoading(false); 
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (data?.user.id){ fetchData();}
  }, [data?.user.id]);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[85vh]"><ReactLoading
        type="spinningBubbles"
        color="#1da1f2"
        height={100}
        width={50}
    /></div>
      ) : (
        <ProfilePage tweets={tweets} likedTweets={likedTweets} bookedTweets={bookedTweets}/>
      )}
    </div>
  );
};

export default Profile;
