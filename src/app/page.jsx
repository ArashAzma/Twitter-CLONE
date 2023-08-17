"use client"
import { loadingContext } from "@/context/loadingProvider";
import { useContext, useEffect, useState } from "react";
import Feed from "@/components/feed"
import * as Realm from 'realm-web'
import { connectToDB } from "@/utils/db";


const REALM_APP_ID = 'application-0-qdkfe';
const ATLAS_SERVICE_NAME = 'mongodb-atlas';
const DATABASE_NAME = 'next_twitter';
const COLLECTION_NAME = 'tweets';
export default function Home() {
  const [data, setData] = useState([]);
  const {setLoading} = useContext(loadingContext);
  async function getData() {
    const app = new Realm.App({ id: REALM_APP_ID });
    const user = await app.logIn(Realm.Credentials.anonymous());
    const mongoClient = user.mongoClient(ATLAS_SERVICE_NAME);
    const collection = mongoClient.db(DATABASE_NAME).collection(COLLECTION_NAME);
    const cursor = await collection
    .aggregate([
      {
        $lookup: {
          from: 'users', // name of the collection containing the creator documents
          localField: 'creator',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' }, // unwind the creator array to convert it back to an object
      {
        $lookup: {
          from: 'users', // name of the collection containing the likedBy documents
          localField: 'likedBy',
          foreignField: '_id',
          as: 'likedBy',
        },
        $lookup: {
          from: 'users', // name of the collection containing the likedBy documents
          localField: 'bookedBy',
          foreignField: '_id',
          as: 'bookedBy',
        },
      },
    ])
    const data =[];
    await cursor.forEach((doc) => {
      data.push(doc);
    });
    // console.log(data)
    setData(data);
    setLoading(false)
  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <div className="flex justify-start h-screen-[52px] items-center ">
        <div className="flex  h-full w-full justify-center">
          <Feed data={data}/>      
        </div>
    </div>
  )
}
