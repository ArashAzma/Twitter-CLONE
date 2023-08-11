import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@/utils/db";
import User from "@/models/user";

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            httpOptions: {
                timeout: 100000,
              }
        })
    ],
    callbacks:{
        async session({session}) {
            const user = await User.findOne({email: session.user.email})
            session.user.id = user._id.toString();
            return session
        },
        async signIn({profile}){
            try{
                await connectToDB();
                const userExists = await User.findOne({email: profile.email})
                if(!userExists){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture
                    })
                }
                return true;
            }catch(err){
                console.log(err);
                return false;
            }
        }

    }
})
export {handler as GET, handler as POST}