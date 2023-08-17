
# Twitter-CLONE
Twitter-CLONE is a web application that mimics the functionality and design of the popular social media platform Twitter.  It allows users to create accounts, post tweets, follow other users, like and more.
# It is built using :
- Next.js
- MongoDb & mongoose
- next-auth(google)
- TailWind
  
![image](https://github.com/ArashAzma/Twitter-CLONE/assets/46264576/0edd0a0d-fb43-4d62-b9b8-97862d395fe7)

![image](https://github.com/ArashAzma/Twitter-CLONE/assets/46264576/2d4bd5eb-8507-4c7d-8975-54f4031634c9)

![image](https://github.com/ArashAzma/Twitter-CLONE/assets/46264576/181e8665-5ab7-4510-959a-c61de5072833)


# Features
Authentication: Users can sign up, log in, and log out using next-auth
Profile: Users can edit their bio.
Timeline: Users can see the latest tweets from the people they follow, as well as their own tweets.
Tweet: Users can create tweets with text and optional tags. They can also delete and edit their own tweets.
Like: Users can like or unlike tweets from other users or themselves.
Follow: Users can follow or unfollow other users. They can also see the number of followers and following for each user.
Search: Users can search for other users by their name or username.

Installation
To run the app locally, you need to have Node.js and MongoDB installed on your machine. Then follow these steps:

Clone the repo: git clone https://github.com/ArashAzma/Twitter-CLONE.git
Install the dependencies: npm install
Create a .env file in the root directory and add the following variables:
MONGODB_URI: The connection string to your MongoDB database
NEXTAUTH_URL: The base URL of your app (e.g. http://localhost:3000)
CLOUDINARY_URL: The connection string to your Cloudinary account (for image uploading)
Start the development server: npm run dev
Open your browser and go to http://localhost:3000

