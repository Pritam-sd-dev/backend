import { Schema, model } from "mongoose";

const TweetSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Tweet = model("Tweet", TweetSchema);

export default Tweet;