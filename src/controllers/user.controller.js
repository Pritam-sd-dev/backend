import Tweet from "../models/tweet.model.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const reqisterUser = async (req, res)  => {
    const {username, password} = req.body;

    try { 
        if(!password && !username) {
            res.status(400).json({status: false, message: 'username or password is empty'});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({username, password: hashedPassword});

        res.status(200).json({status: true, message: 'user successfully registered :)'})
    } catch (error) {
        res.status(503).json({status: false, message: 'something went wrong :(, please try again'});
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});

        if(!user) {
            res.status(404).json({status: false, message: 'user not found :('});
            return;
        }

        if(!bcrypt.compare(password, user.password)) {
            res.status(401).json({status: false, message: 'wrong password :('});
            return;
        }

        console.log(user);
        const jwtToken = await user.generateJwtToken();
        res.cookie("token", jwtToken, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({status: true, message: 'successfully loggedIn :)'});

    } catch (error) {
        res.status(500).json({status: false, message: 'something went wrong :('});
    }
}

export const getUserTimeline = async (req, res) => {
    const { cursor, limit = 10 } = req.query;
    const { userId } = req.params
    // doubt

    try {
        let query = {userId};

        // If there is a cursor, use it to fetch results after this cursor
        if (cursor) {
            query._id = { $gt: cursor };
        }

        const tweets = await Tweet.find(query).select('-userId')
        // .sort({ _id: -1 }) // Sort in descending order of _id (most recent first)
        .limit(Number(limit) + 1);

        let hasNextPage = tweets.length > Number(limit);
        if (hasNextPage) {
            // Remove the extra element used to determine next page
            tweets.pop();
        }


        res.status(200).json(
            {
                status: true,
                message: '', 
                data: {
                    tweets,
                    nextCursor: hasNextPage ? tweets[tweets.length - 1] : null,
                }
            }
        );

    } catch (error) {
        res.status(500).json({status: false, message: 'something went wrong :('});
    }
}