import Tweet from "../models/tweet.model.js";


export const createTweet = async (req, res) => {
    const {text} = req.body;
    if(!text) {
        res.status(400).json({status: false, message: 'text not found :('});
        return;
    }
    try {
        const savedTweet = await Tweet.create({userId: req.user.id, text});
        res.status(200).json({status: true, message: '', data: {tweetId: savedTweet._id}});
    } catch (error) {
        res.status(503).json({status: false, message: 'something went wrong :(, please try again'});
    }
}