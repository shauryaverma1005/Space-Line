import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config/ENV.js";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: 6
    },
    avatarPublicId:{
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: String,
    }
},{timestamps: true})


// pre hook to hash password before saving
userSchema.pre("save", async function (){
    if(!this.isModified("password")) {return }

    this.password = await bcrypt.hash(this.password, 12);
})


// method to compare password entered
userSchema.methods.isPasswordValid = async function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password);
}

// method to generate access token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        ENV.ACCESS_SECRET,
        {
            expiresIn: ENV.ACCESS_EXPIRY,
        }
    )
}


// method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        ENV.REFRESH_SECRET,
        {
            expiresIn: ENV.REFRESH_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)

