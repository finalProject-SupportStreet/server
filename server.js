import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// import session from "express-session";
import userRouter from "./routes/userRouter.js";
import newsRouter from "./routes/newsRouter.js";
import groupsRouter from "./routes/groupsRouter.js";

//import userRouter from "./routes/user.js";

const app = express();

/******************************************************
 *    Mit Mongoose verbinden
 ******************************************************/

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log(`MongoDB connected`))
  .catch((error) => console.log(error, "Database did not connect! ☹️❌"));

mongoose.connection.on("error", () =>
  console.log("Database connection error! ☹️❌")
);

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
app.use(express.json());

/******************************************************
 * API
 * ******************************************************/

app.use("/", userRouter);
app.use("/", newsRouter);
app.use("/", groupsRouter);

/******************************************************
 *   Server starten
 * ******************************************************/

app.listen(5500, () => {
  console.log("Server läuft auf Port 5500");
});
