"use client"
import React, { useState, useEffect } from 'react';
import { RiSearch2Line } from "react-icons/ri";
import { useSession } from "next-auth/react";
import {useRouter} from 'next/navigation';
import ReactLoading from 'react-loading';
import Card from '@/components/card';
import Form from "@/components/feedForm";

const Feed = () => {
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const {status, data} = useSession();
  const [errors, setErrors] = useState(null);
  const [tweet, setTweet] = useState({ body: "", tag: "" });
  const router = useRouter();
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

    const updatedSearch = Data.filter((item) => {
      const tagIncluded = newSearchText.startsWith('#') && item.tag.includes(newSearchText);
      const idIncluded = newSearchText.startsWith('@') && item.creator.username.includes(newSearchText.slice(1));
      const tweetIncluded = item.tweet.includes(newSearchText);
      return tagIncluded || idIncluded ||tweetIncluded;
    });
    setSearch(updatedSearch);
  };
  const handleTagClick = (tag) => {
    const tagSearch = Data.filter((tweet)=> {
      return tweet.tag.includes(tag);
    })
    setSearch(tagSearch);
    setSearchText(tag);
  }
  const createTweet = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/tweet/new", {
        method: "POST",
        body: JSON.stringify({
          userId: data?.user.id,
          text: tweet.body,
          tag: tweet.tag,
        }),
      });
      if (res.ok) {
        console.log("SAVED");
        location.reload();
        console.log("ref");
      } else {
        const errorData = await res.json();
        setErrors(errorData);
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderCards = searchText.length > 0 ? search : Data;
  return (
    <>
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
    <div className="flex flex-col items-center gap-8">

      {data?.user && <div className="hidden lg:block lg:absolute lg:left-[424px] lg:top-[20px] flex-col w-[100px] h-[400px] justify-center items-center gap-4">
        <Form
          type={"Create"}
          tweet={tweet}
          setTweet={setTweet}
          handleSubmit={createTweet}
        />
        {errors && (
          <div className="absolute lg:left-15 w-[300px] flex justify-start text-red-900 text-sm font-semibold">
            <div>{errors.errors.tweet?.message}</div>
            <div>{errors.errors.tag?.message}</div>
          </div>
        )}
      </div>}

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