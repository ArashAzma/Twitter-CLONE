import { connectToDB } from "@/utils/db";
import Tweet from "@/models/Tweets";
import User from '@/models/user';


export const GET = async(req, {params}) => {
    try {
        await connectToDB();
        const tweets = await Tweet.find({creator:params.id}).populate('creator').populate('likedBy').sort({ createdAt: -1 })
        const user = await User.findById(params.id)
        .populate('likedTweets')
        .populate({
          path: 'likedTweets',
          options: { sort: { updatedAt: -1 } },
          populate: {
            path: 'creator likedBy',
          },
        })
        .populate('bookedTweets')
        .populate({
          path: 'bookedTweets',
          options: { sort: { updatedAt: -1 } },
          populate: {
            path: 'creator likedBy',
          },
        })
        return new Response(JSON.stringify({tweets, likedTweets:user.likedTweets, bookedTweets:user.bookedTweets}), {status:200})    
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), {status:500})    
    }
};  