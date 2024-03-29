import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// middlewares:
// whitelist frontend port 5173
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// JSON parser
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Performance Tracker - Remove in production
app.use(morgan("dev"));

app.use(appRouter);

export default app;
