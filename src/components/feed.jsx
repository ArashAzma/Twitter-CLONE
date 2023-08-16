"use client"
import React, { useState, useEffect } from 'react';
import { RiSearch2Line, RiCloseFill } from "react-icons/ri";
import ReactLoading from 'react-loading';
import Card from '@/components/card';
import useSWR from 'swr';

const fetchData = async () => {
  const res = await fetch('/api/tweet');
  const data = await res.json();
  return data;
};

const Feed = () => {
  const { data, error } = useSWR('/api/tweet', fetchData,{ refreshInterval: 10,});
  const [search, setSearch] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (error) {
    return <p className="flex items-center justify-center">Error fetching data: {error.message}</p>;
  }
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
    setShowInput(!showInput);
  }
  const handleCloseButton = () => {
    setShowInput(!showInput); 
    setSearchText('');
  }

  const renderCards = searchText.length > 0 ? search : data;
  return (
    <>
       <>
        <button
          onClick={() => setShowInput(!showInput)}
          className={`${showInput? '-top-[300px]': 'top-[30px]'} ${searchText.length>0? 'text-green-600': ''} absolute left-[80px] text-[20px]`}
        >
          <RiSearch2Line className="hover:scale-110 duration-200" />
        </button>
          <>
            <div className={`absolute ${!showInput? '-top-[100px] duration-300 smooth': 'top-[40px] duration-300 smooth'} p-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[350px] md:w-[400px] py-2 bg-[#06141d] rounded-xl flex items-center justify-center`}>
            <button onClick={handleCloseButton} className="absolute right-5 top-5 hover:text-red-800 duration-200 text-lg">
                < RiCloseFill/>
              </button>
              <input
                type="text"
                placeholder={"Search "}
                value={searchText}
                onChange={handleSearchChange}
                required
                className="flex w-full rounded-xl bg-[#1b2730] p-2"
              />
            </div>
          </>
        </>
    <div className="flex flex-col items-center gap-8">

      <div className="flex flex-col px-8 gap-4 md:mx-[100px] h-[83vh] items-center overflow-hidden overflow-y-auto">
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
              data={tweet.createdAt}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-[calc(100vh-84px)]">
            <ReactLoading type="spinningBubbles" color="#1da1f2" height={100} width={50} />
          </div>
        )}
      </div>
    </div>
  </>
  );
};

export default Feed;