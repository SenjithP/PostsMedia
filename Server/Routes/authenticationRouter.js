import express from "express";
import {
  login,
  registration,
  userLogout
} from "../Controllers/authenticationController.js";
const authenticationRouter = express.Router();
authenticationRouter.post("/userRegistration", registration);
authenticationRouter.post("/userLogin", login);
authenticationRouter.post("/userLogout", userLogout);

export default authenticationRouter;
