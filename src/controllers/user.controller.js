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
        res.status(503).json({status: false, message: 'something went wrong :(, please try again'})
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