import AsyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import ValidationError from "../Error/ValidationError.js";
import UnauthorizedError from "../Error/UnauthorizedError.js";
import ApiResponse  from "./ApiResponse/index.js";

const registerUser = AsyncHandler(async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        throw new ValidationError("Validation Error",errors.array());
    }
    var { username,email,password } = req.body;
    const salt = await bcrypt.genSalt(8);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({ username,email,password })
    await newUser.save();
    ApiResponse(res,201,true,"User registered Succesfully",null);
});

const loginUser = AsyncHandler(async (req,res)=>{
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user)
        throw new UnauthorizedError("Unauthorized Error",[{msg:"This username does not Exists"}]);
    let pass = await bcrypt.compare(password, user.password);
    if (!pass)
        throw new UnauthorizedError("Unauthorized Error",[{msg:"You have Entered a Wrong Password"}]);
    const token = generateToken(user);
    ApiResponse(res,200,true,"User Logged in Successfully",{accessToken : token});
});

const authUser = AsyncHandler(async (req,res) => {
    ApiResponse(res,200,true,"User is Authorized",null);
});

function generateToken(payload){
    const options = {
        expiresIn : "1d",
    }
    return jwt.sign({payload},process.env.SECRET_TOKEN,options)
}

export default {
    loginUser,
    registerUser,
    authUser,
}