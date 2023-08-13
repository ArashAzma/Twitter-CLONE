import Tweet from "@/models/Tweets";
import User from "@/models/user";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET =async(req, {params}) => {
    try {
        await connectToDB();
        const res = await Tweet.findById(params.id).populate("creator");
        if(!res){
            return new NextResponse("Tweet not found", {status:404})
        }
        return new NextResponse(JSON.stringify(res), {status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify(error), {status:500})
    }
}
export const PATCH = async(req, {params}) => {
    const {action, tweet, tag, userId} = await req.json();
    if(action==="addlike"){
        try{
            await connectToDB();
            const tw = await Tweet.findById(params.id);
            const us = await User.findById(userId);
            if(!tw || !us){
                return NextResponse("Tweet or User not found", {status:404})
            }
            tw.like=tw.like+1;
            tw.likedBy.push(us);
            await tw.save();
            us.likedTweets.push(tw);
            await us.save();
            // console.log("\n")
            // console.log(tw)
            // console.log("\n")
            // console.log(us)
            // console.log("\n")
            return new NextResponse(json.stringify("Added"), {status:200});
        }catch(err){
            return new NextResponse(JSON.stringify(err), {status:200});
        }
    }else if(action==="removelike"){
        try{
            await connectToDB();
            const tw = await Tweet.findById(params.id);
            const us = await User.findById(userId);
            if(!tw || !us){
                return NextResponse("Tweet or User not found", {status:404})
            }
            tw.like>0 ? tw.like=tw.like-1 : tw.like=0; 
            tw.likedBy.pull(us);
            await tw.save();
            us.likedTweets.pull(tw)
            await us.save();
            return new NextResponse("REMOVED", {status:200});
        }catch(err){
            return new NextResponse(JSON.stringify(err), {status:200});
        }
    }else if (action==="addBookmark"){
        try{
            await connectToDB();
            const tw = await Tweet.findById(params.id);
            const us = await User.findById(userId);
            if(!tw || !us){
                return NextResponse("Tweet or User not found", {status:404})
            }
            tw.bookedBy.push(userId);
            // console.log(tw)
            await tw.save();
            us.bookedTweets.push(params.id);
            // console.log(us)
            await us.save();
            return new NextResponse(json.stringify("Added"), {status:200});
        }catch(err){
            return new NextResponse(JSON.stringify(err), {status:200});
        }
    }else if (action==="removeBookmark"){
        try{
            await connectToDB();
            const tw = await Tweet.findById(params.id);
            const us = await User.findById(userId);
            if(!tw || !us){
                return NextResponse("Tweet or User not found", {status:404})
            }
            tw.bookedBy.pull(userId);
            await tw.save();
            us.bookedTweets.pull(params.id);
            await us.save();
            return new NextResponse(json.stringify("Added"), {status:200});
        }catch(err){
            return new NextResponse(JSON.stringify(err), {status:200});
        }
    }
    else{
        try {
            await connectToDB();
            const pTweet = await Tweet.findById(params.id);
            if(!pTweet){
                return NextResponse("Tweet not found", {status:404})
            }
            pTweet.tweet = tweet;
            pTweet.tag = tag;
            await pTweet.save();
            return new NextResponse("Edited", {status:200});
        } catch (error) {
            return new NextResponse(error, {status:500});
        }
    }
}
export const DELETE = async(req, {params})=>{
    try{
        await connectToDB();
        await Tweet.findByIdAndRemove(params.id)
        return new NextResponse("Deleted", {status:200});
    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify(err), {status:500});
    }
}