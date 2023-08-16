"use client"
import { loadingContext } from "@/context/loadingProvider";
import { useContext, useEffect } from "react";
import useSWR from 'swr';
import Feed from "@/components/feed"

const fetchData = async () => {
  const res = await fetch('/api/tweet');
  const DATA = await res.json();
  return DATA;
};
export default function Home() {
  const { data, error } = useSWR('/api/tweet', fetchData,{ refreshInterval: 10,});
  const {loading, setLoading} = useContext(loadingContext);

  useEffect(() => {
    if (data) {
      // console.log(data)
      setLoading(false);
    }
  }, [data]);
  return (
    <div className="flex justify-start h-screen-[52px] items-center ">
        <div className="flex  h-full w-full justify-center">
          <Feed data={data}/>      
        </div>
    </div>
  )
}
