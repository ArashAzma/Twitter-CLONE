"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {useRouter} from 'next/navigation'
import ProfilePage from '@/components/profilePage';
import ReactLoading from "react-loading";
import useSWR from 'swr'; 

const fetchData = async (data) => {
  console.log(data);
  const res = await fetch(`/api/users/${data.user.id}/tweets`);
  const DATA = await res.json();
  console.log(DATA)
  return DATA;
};
 
 
const Profile = () => {
  const { status, data } = useSession();
  const [tweets, setTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [bookedTweets, setBookedTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { data: Data, error } = useSWR(`/api/users/${data?.user.id}/tweets`, () => fetchData(data));
  
  if(status==="unauthenticated"){
    router.push("/");
  }
  useEffect(() => {
    if (Data) {
      setTweets(Data.tweets);
      setLikedTweets(Data.likedTweets);
      setBookedTweets(Data.bookedTweets);
      setLoading(false);
    }
    const fetchUser = async() => {
      try {
        const res = await fetch(`api/users/${data.user.id}`);
        if(res.ok){
          const user = await res.json(); 
          setUser(user);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (data?.user.id){fetchUser();} 
  }, [data?.user.id, Data]);
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
        <ProfilePage user={user} tweets={tweets} likedTweets={likedTweets} bookedTweets={bookedTweets}/>
      )}
    </div>
  );
};

export default Profile;
