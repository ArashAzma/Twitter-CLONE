"use client"
import React, { useState, useEffect } from 'react';
import { RiSearch2Line } from "react-icons/ri";
import Card from '@/components/card';
import ReactLoading from 'react-loading';
import { useSession } from "next-auth/react";


const Feed = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const {status} = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/tweet');
        const newData = await res.json();
        setData(newData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [status==="authenticated" || status==="unauthenticated"]);
  const handleSearchChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);

    const updatedSearch = data.filter((item) => {
      const tagIncluded = newSearchText.startsWith('#') && item.tag.includes(newSearchText);
      const idIncluded = newSearchText.startsWith('@') && item.creator.username.includes(newSearchText.slice(1));
      const tweetIncluded = item.tweet.includes(newSearchText);
      return tagIncluded || idIncluded ||tweetIncluded;
    });
    setSearch(updatedSearch);
  };
  const handleTagClick = (tag) => {
    const tagSearch = data.filter((tweet)=> {
      return tweet.tag.includes(tag);
    })
    setSearch(tagSearch);
    setSearchText(tag);
  }
  const renderCards = searchText.length > 0 ? search : data;
  return (
    <div className="flex flex-col items-center gap-8">
      <>
        <input
          type="text"
          placeholder={"Search "}
          value={searchText}
          onChange={handleSearchChange}
          required
          className="flex rounded-xl bg-[#1b2730] p-2 absolute top-[20px] left-[80px]"
        />
        <RiSearch2Line className="absolute top-[32px] left-[290px] opacity-70"/>
      </>
      <div className="flex flex-col px-8 gap-4 md:mx-[100px] h-[85vh] items-center overflow-hidden overflow-y-auto">
        {!loading ? (
          renderCards.map((tweet) => (
            <Card
              key={tweet._id}
              id={tweet._id}
              name={tweet.creator.username}
              accId={tweet.creator._id}
              image={tweet.creator.image}
              tweet={tweet.tweet}
              tag={tweet.tag}
              likedBy={tweet.likedBy}
              bookedBy={tweet.bookedBy}
              tagClick={handleTagClick}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-[calc(100vh-84px)]">
            <ReactLoading type="spinningBubbles" color="#1da1f2" height={100} width={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;