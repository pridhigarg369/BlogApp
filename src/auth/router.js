const {
  register,
  Login,
  loginMiddleWare,
  reset_Password,
  forgot_Password,
} = require("./controllers/controller");

const express = require("express");
const authRouter = express.Router();

authRouter.post("/Register", register);
authRouter.post("/Login", loginMiddleWare, Login);
authRouter.post("/Forgot", forgot_Password);
authRouter.post("/Reset", loginMiddleWare, reset_Password);
module.exports = authRouter;
