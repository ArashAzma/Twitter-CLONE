import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
    mongoose.set("strictQuery", true) //ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db
    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
          dbName: "next_twitter",
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
    
        isConnected = true;
    
        console.log('MongoDB connected')
      } catch (error) {
        console.log(error);
      }


}
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI_COMPASS);
    console.log("CONNECTED")
  } catch (error) {
    throw new Error(error)
}
};
export default connect; 