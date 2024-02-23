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
app.use(cors({ origin: "http://18.191.31.73", credentials: true }));

// JSON parser
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Performance Tracker - Remove in production
app.use(morgan("dev"));

app.use("/api", appRouter);

export default app;
