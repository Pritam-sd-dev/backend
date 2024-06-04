import User from "../models/user.model";
import bcrypt from 'bcryptjs'

export const reqisterUser = async (req, res)  => {
    const {username, password} = req.body;

    try { 
        if(!password && !username) {
            res.status(400).json({status: false, message: 'username or password is empty'});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        User.create({username, hashedPassword});

        res.status(200).json({status: true, message: 'user successfully registered :)'})
    } catch (error) {
        res.status(503).json({status: false, message: 'something went wrong :(, please try again'})
    }
}