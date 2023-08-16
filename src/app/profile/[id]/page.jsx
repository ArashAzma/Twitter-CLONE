"use client"
import React,{useState, useEffect} from 'react'
import ProfilePage from '@/components/profilePage';
import ReactLoading from "react-loading";

const AccountProfile = ({params}) => {
    const [tweets, setTweets] = useState([]);
    const [likedTweets, setLikedTweets] = useState([]);
    const [bookedTweets, setBookedTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [acc, setAcc] = useState(null);
    const accId = params.id;
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`/api/users/${accId}/tweets`, { next: { revalidate: 10 }});
            const body = await res.json();
            setTweets(body.tweets);
            setLikedTweets(body.likedTweets);
            setBookedTweets(body.bookedTweets);
            setLoading(false); 
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };
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
        if (accId){ fetchData(); fetchUser();} 
      }, [accId]);
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