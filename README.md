
# Twitter-CLONE
Twitter-CLONE is a web application that mimics the functionality and design of the popular social media platform Twitter. It is built using Next.js, MongoDB, and Tailwind CSS. It allows users to create accounts, post tweets, follow other users, like and more.

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

