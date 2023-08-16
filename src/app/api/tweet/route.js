import { connectToDB } from "@/utils/db";
import Tweet from "@/models/Tweets";

export const GET = async (res) => {
  try {
    await connectToDB();
    const tweets = await Tweet.find({})
      .populate('creator')
      .populate('likedBy')
      .sort({ createdAt: -1 })
      .limit(60);
    const responseBody = JSON.stringify(tweets);
    return new Response(responseBody, { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
