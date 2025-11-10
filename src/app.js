import express from "express";
import cors from "cors"

const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "16 kb" }));

app.use(express.urlencoded({ extended: true, limit: "16 kb" }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true, //allow cookies/auth headers
    allowedHeaders: ["Content-type", "Authorization"],
  }),
);

export default app;
