import Tweet from "@/models/Tweets";
import { connectToDB } from "@/utils/db"
import { NextResponse } from "next/server";

export const POST = async(req) => {
    const {userId, text, tag} = await req.json();
    try{
        await connectToDB();
        const newTweet = new Tweet({creator:userId , tweet:text, tag, like:0});
        await newTweet.save();
        return new Response(JSON.stringify(newTweet), { status: 201 })
    }catch(err){
        // console.log(err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}