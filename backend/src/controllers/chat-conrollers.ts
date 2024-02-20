import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    // store all previous chats in 'chats'
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });
    // initialize OpenAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    // request response from OpenAI
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
      error: error,
    });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
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
      chats: existingUser.chats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "ERROR",
      cause: error.message,
    });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingUser = await User.findById(res.locals.jwtData.id);
    if (!existingUser) {
      return res.status(401).send("User not registed!");
    }
    if (existingUser._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Invalid access token!");
    }
    //@ts-ignore
    existingUser.chats = [];
    await existingUser.save();
    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "ERROR",
      cause: error.message,
    });
  }
};
