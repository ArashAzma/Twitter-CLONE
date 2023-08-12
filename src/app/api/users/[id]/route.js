import { connectToDB } from "@/utils/db";
import User from '@/models/user';
import { NextResponse } from "next/server";

export const GET = async (res, {params}) => {
    try{
        await connectToDB();
        const user= await User.findById(params.id);
        console.log(params.id)
        console.log(user)
        if(!user){
            return new NextResponse("user doesnt Exist", {status:404});
        }
        return new NextResponse(JSON.stringify(user), {status:200});
    }catch(err){
        return new NextResponse(JSON.stringify(err), {status:500});
    }
}
export const PATCH = async(res, {params}) => {
    try{
        const {bio} = await res.json();
        const user = await User.findById(params.id);
        if(!user){
            throw new NextResponse("User not found", {status:404});
        }
        user.bio = bio;
        await user.save();
        return new NextResponse(json.stringify("Added bio"), {status:200});
    }catch(err){
        return new NextResponse(json.stringify(err), {status:500});
    }
}