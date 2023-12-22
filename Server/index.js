import express from "express";
import dotenv from "dotenv";
import { connect } from "./Config/mongoDBConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authenticationRouter from "./Routes/authenticationRouter.js";
import homeRouter from "./Routes/postRouter.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static("Public"));

app.use("/api/authentication", authenticationRouter);
app.use("/api/home",homeRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connect();
  console.log(`Backend server started sucessfully, http://localhost:${port}`);
});
