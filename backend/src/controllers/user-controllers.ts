import { NextFunction, Request, Response } from "express";
import User from "../models/User.js"
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
        try {
            const users = await User.find();
            return res.status(200).json({
                message: "OK",
                users,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "ERROR",
                cause: error.message,
            });
        }
}

const handleCookieAndToken = (res, existingUser) => {
    res.clearCookie(
        COOKIE_NAME,
        {
            path: "/",
            domain: ".onrender.com",
            httpOnly: true,
            signed: true,
            secure: true,
        }
    );

    const token = createToken(existingUser._id.toString(), existingUser.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    
    res.cookie(
        COOKIE_NAME, 
        token, 
        {
            path: "/",
            domain: ".onrender.com",
            expires,
            httpOnly: true,
            signed: true,
            secure: true,
        }
    );
}

export const userSignup = async (
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
        try {
            const {name, email, password} = req.body;
            const existingUser = await User.findOne({email});
            if (existingUser) {
                return res.status(401).send("User already registered!");
            }
            const hashedPassword = await hash(password, 10);
            const user = new User({name, email, password:hashedPassword});
            await user.save() // save user to the MongoDB

            handleCookieAndToken(res, user);

            return res.status(201).json({
                message: "OK",
                name: user.name,
                email: user.email,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "ERROR",
                cause: error.message,
            });
        }
}

export const userLogin = async (
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
        try {
            const {email, password} = req.body;
            const existingUser = await User.findOne({email});
            if (!existingUser) {
                return res.status(401).send("User does not exist!");
            }

            const isCorrectPassword = await compare(password, existingUser.password);
            if (!isCorrectPassword) {
                return res.status(403).send("Incorrect password!");
            }

            handleCookieAndToken(res, existingUser);

            return res.status(201).json({
                message: "OK",
                name: existingUser.name,
                email: existingUser.email,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "ERROR",
                cause: error.message,
            });
        }
}

// Veify user token
export const verifyUser = async (
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
        try {
            const existingUser = await User.findById(res.locals.jwtData.id);
            if (!existingUser) {
                return res.status(401).send("User not registed!");
            }
            if (existingUser._id.toString() !== res.locals.jwtData.id) {
                return res.status(401).send("Invalid access token!");
            }

            return res.status(200).json({
                message: "OK",
                name: existingUser.name,
                email: existingUser.email,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "ERROR",
                cause: error.message,
            });
        }
}

export const userLogout = async (
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
        try {
            const existingUser = await User.findById(res.locals.jwtData.id);
            if (!existingUser) {
                return res.status(401).send("User not registed!");
            }
            if (existingUser._id.toString() !== res.locals.jwtData.id) {
                return res.status(401).send("Invalid access token!");
            }

            res.clearCookie(
                COOKIE_NAME,
                {
                    path: "/",
                    domain: ".onrender.com",
                    httpOnly: true,
                    signed: true,
                    secure: true,
                }
            );

            return res.status(200).json({
                message: "OK",
                name: existingUser.name,
                email: existingUser.email,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "ERROR",
                cause: error.message,
            });
        }
}