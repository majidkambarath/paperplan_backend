import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Authrouter from "./router/auth/authRouter.js";
import { mongodb } from "./config/connaction.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4444;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors connecting
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

//database connecting
mongodb();

app.use("/api/", Authrouter);

const server = app.listen(port, () => {
  console.log("server running !!!!!");
  console.log(`http://localhost:${port}`);
});
