import { Schema, model, models } from "mongoose";

const TweetSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User' // which collection the field is referencing
    },
    tweet:{
        type:String,
        required:[true, "tweet is reqiured"],
        minlength: [4, "tweet must be at least 4 characters long"],
    },
    tag:{
        type:String,
        required:[true, "tag is reqiured"],
        match: [/^#[\w]+$/, "tag must start with '#' and contain only one word"]
    },
    like:{
        type:Number
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    bookedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    },{timestamps:true}
)
const Tweet = models.Tweet || model("Tweet", TweetSchema);
export default Tweet;