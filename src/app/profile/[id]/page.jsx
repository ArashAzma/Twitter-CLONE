"use client"
import React,{useState, useEffect} from 'react'
import ProfilePage from '@/components/profilePage';
import ReactLoading from "react-loading";
import useSWR from 'swr';

const fetchData = async (id) => {
  const res = await fetch(`/api/users/${id}/tweets`);
  const DATA = await res.json();
  return DATA;
};
 
const AccountProfile = ({params}) => {
    const [tweets, setTweets] = useState([]);
    const [likedTweets, setLikedTweets] = useState([]);
    const [bookedTweets, setBookedTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: Data, error } = useSWR(`/api/users/${params.id}/tweets`, () => fetchData(params.id),{ refreshInterval: 10,});
    const [acc, setAcc] = useState(null);
    const accId = params.id;
    useEffect(() => {
      if (Data) {
        setTweets(Data.tweets);
        setLikedTweets(Data.likedTweets);
        setBookedTweets(Data.bookedTweets);
        // console.log(Data)
        setLoading(false);
      }
        const fetchUser = async() => {
          try {
              console.log(accId);
            const res = await fetch(`/api/users/${accId}`);
            if(res.ok){
              const user = await res.json(); 
              setAcc(user);
            }
          } catch (error) {
            console.log(error);
          }
        }
        if (accId){fetchUser();} 
      }, [accId, Data]);
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
            <ProfilePage user={acc} tweets={tweets} likedTweets={likedTweets} bookedTweets={bookedTweets}/>
        )}
    </div>
  )
}

export default AccountProfile