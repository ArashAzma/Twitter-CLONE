import { connectToDB } from "@/utils/db";
import Tweet from "@/models/Tweets";

export const GET = async() => {
    try {
        await connectToDB();
        const tweets = await Tweet.find({}).populate('creator');
        return new Response(JSON.stringify(tweets), {status:200})    
    } catch (error) {
        return new Response(error, {status:500})    
    }
}