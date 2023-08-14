"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@/components/form";
const Edit = () => {
  const { status, data } = useSession();
  const router = useRouter();
  const searchParam = useSearchParams();
  const id = searchParam.get("id");
  const [newTweet, setNewTweet] = useState({ body: "", tag: "" });
  if (status === "unauthenticated") {
    router.push("/");
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`api/tweet/${id}`);
      const data = await res.json();
      setNewTweet({ body: data.tweet, tag: data.tag });
    };
    if (id) fetchData();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`api/tweet/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          action: "edit",
          tweet: newTweet.body,
          tag: newTweet.tag,
          userId: data?.user.id,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <Form
        type="Edit"
        tweet={newTweet}
        setTweet={setNewTweet}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Edit;
