"use client";
import Form from "@/components/form";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {useSWRConfig} from 'swr';
const Create = () => {
  const { status, data } = useSession();
  const [errors, setErrors] = useState(null);
  const [tweet, setTweet] = useState({ body: "", tag: "" });
  const router = useRouter();
  const { mutate } = useSWRConfig()
  if (status === "unauthenticated") {
    router.push("/");
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
        mutate('/api/tweet')
        router.push("/");
      } else {
        const errorData = await res.json();
        setErrors(errorData);
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col w-full h-[calc(100vh-84px)] justify-center items-center gap-4">
      <Form
        type={"Create"}
        tweet={tweet}
        setTweet={setTweet}
        handleSubmit={createTweet}
      />
      {errors && (
        <div className="flex flex-col justify-start text-red-900 text-sm font-semibold">
          <div>{errors.errors.tweet?.message}</div>
          <div>{errors.errors.tag?.message}</div>
        </div>
      )}
    </div>
  );
};

export default Create;
