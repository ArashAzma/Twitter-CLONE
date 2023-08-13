import { connectToDB } from "@/utils/db";
import Tweet from "@/models/Tweets";
import User from '@/models/user';


export const GET = async(req, {params}) => {
    try {
        await connectToDB();
        const tweets = await Tweet.find({creator:params.id}).populate('creator').populate('likedBy')
        const user = await User.findById(params.id)
        .populate('likedTweets')
        .populate({
          path: 'likedTweets',
          populate: {
            path: 'creator likedBy',
          },
        })
        .populate('bookedTweets')
        .populate({
          path: 'bookedTweets',
          populate: {
            path: 'creator likedBy',
          },
        });
          console.log(tweets);
        return new Response(JSON.stringify({tweets, likedTweets:user.likedTweets, bookedTweets:user.bookedTweets}), {status:200})    
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), {status:500})    
    }
};  