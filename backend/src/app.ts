import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// middlewares:
// whitelist frontend port 4173
// app.use(cors({ origin: "http://localhost:4173", credentials: true }));
app.use(cors({ origin: "https://heesoo-hwang.onrender.com", credentials: true }));

// JSON parser
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Performance Tracker - Remove in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
