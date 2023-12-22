import express from "express";
import {
  login,
  registration,
} from "../Controllers/authenticationController.js";
const authenticationRouter = express.Router();
authenticationRouter.post("/userRegistration", registration);
authenticationRouter.post("/userLogin", login);
export default authenticationRouter;
