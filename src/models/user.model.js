import { Schema, model } from "mongoose";
import jwt from 'jsonwebtoken'

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: true,
        required: true
    }
});

UserSchema.methods = {
    generateJwtToken: function() {
        return jwt.sign(
            { id: this._id, email: this.email },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        );
    }
}

const User = model("User", UserSchema);

export default User;