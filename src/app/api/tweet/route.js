import { connectToDB } from "@/utils/db";
import Tweet from "@/models/Tweets";
export const runtime = 'edge';

export const GET = async (res) => {
  try {
    await connectToDB();
    const tweets = await Tweet.find({})
      .populate('creator')
      .populate('likedBy')
      .sort({ createdAt: -1 })
      .limit(60);

    const responseBody = JSON.stringify(tweets);
    return new Response(responseBody, { status: 200,  headers: {
            'Cache-Control': 'public, s-maxage=1',
            'CDN-Cache-Control': 'public, s-maxage=60',
            'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
          },
     });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
