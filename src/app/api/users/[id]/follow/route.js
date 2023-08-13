import User from "@/models/user";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async(res, {params}) => {
    const {action, acc:addFollowerTo} = await res.json();
    const addFollowTo = params.id;
    if(action=="follow"){
        try{
            await connectToDB();
            const USER = await User.findById(addFollowTo);
            const ACCOUNT = await User.findById(addFollowerTo);
            USER.following.push(ACCOUNT);
            ACCOUNT.followers.push(USER);
            await USER.save();
            await ACCOUNT.save();
            return new NextResponse("added", {status:200})
        }catch(err){
            return new NextResponse(JSON.stringify(err), {status:500})
        }
    }else{
        try{
            await connectToDB();
            const USER = await User.findById(addFollowTo);
            const ACCOUNT = await User.findById(addFollowerTo);
            USER.following.pull(ACCOUNT);
            ACCOUNT.followers.pull(USER);
            await USER.save();
            await ACCOUNT.save();
            return new NextResponse("unfollowed", {status:200})
        }catch(err){
            return new NextResponse(JSON.stringify(err), {status:500})
        }
    }
}