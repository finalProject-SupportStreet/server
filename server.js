import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// import session from "express-session";
import userRouter from "./routes/userRouter.js";
import newsRouter from "./routes/newsRouter.js";
import groupsRouter from "./routes/groupsRouter.js";
import marketRouter from "./routes/marketRouter.js";
import dotenv from "dotenv";

//import userRouter from "./routes/user.js";
dotenv.config();
const app = express();

/******************************************************
 *    Mit Mongoose verbinden
 ******************************************************/

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

const URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(URI)
  .then(() => console.log(`MongoDB connected`))
  .catch((error) => console.log(error, "Database did not connect! ☹️❌"));

mongoose.connection.on("error", () => console.log);

app.set("trust proxy", 1);
/******************************************************
 *    Middleware
 ******************************************************/

app.use(
  cors({
    origin: "http://localhost:5173", // URL unseres Frontends
    credentials: true, // erlaube Cookie-Austausch
  })
);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

/******************************************************
 * API
 * ******************************************************/

app.use("/", userRouter);
app.use("/", newsRouter);
app.use("/", groupsRouter);
app.use("/", marketRouter);

/******************************************************
 *   Server starten
 * ******************************************************/

app.listen(5500, () => {
  console.log("Server läuft auf Port 5500");
});
