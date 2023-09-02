import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Authrouter from "./router/auth/authRouter.js";
import AdminRouter from "./router/admin/adminRouter.js";
import ChatBotRouter from './router/bot/BotRouter.js'
import { mongodb } from "./config/connaction.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4444;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors connecting
app.use(
  cors({
    origin: "https://healtether.netlify.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

//database connecting
mongodb();

app.use("/api/", Authrouter);
app.use("/api/admin", AdminRouter);
app.use("/api/chat", ChatBotRouter);

const server = app.listen(port, () => {
  console.log("server running !!!!!");
  console.log(`http://localhost:${port}`);
});
