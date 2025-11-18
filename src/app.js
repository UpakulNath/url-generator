import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "16 kb" }));

app.use(express.urlencoded({ extended: true, limit: "16 kb" }));

app.use(
  cors({
    origin: `http://localhost:${port}`,
    methods: ["GET", "POST"],
    credentials: true, //allow cookies/auth headers
    allowedHeaders: ["Content-type", "Authorization"],
  }),
);

import authRouter from "./routes/generatorUser.routes.js";
app.use("/api/v1/urlUser", authRouter);
app.use(cookieParser());

export default app;
