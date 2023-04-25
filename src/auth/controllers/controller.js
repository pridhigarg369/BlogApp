const { User } = require("../models/user_DB");
var jsonWebToken = require("jsonwebtoken");
const key = "whdbfwkhbweuirbvehjfbveubf";
const nodemailer = require("nodemailer");

const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!username || !password || !email) {
    return res.send("Username and Password Required");
  }

  var UserExists = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (UserExists) {
    return res.send("User or Username already Exists");
  }
  var Newuser = await User.create(req.body);
  Newuser.ency_password = undefined;
  return res.json({ status: "Registration Successful", user: Newuser });
};
const loginMiddleWare = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.send("Username and Password Required");
  }
  var userExists = await User.findOne({ username: username });
  if (!userExists) {
    return res.json({ message: "No account with username exists" });
  }
  if (!userExists.is_authenticate(password)) {
    return res.json({
      status: "Error",
      msg: "Wrong password.",
    });
  }
  var token = jsonWebToken.sign({ _id: userExists._id }, key);
  req.body.token = token;
  req.body.userExists = userExists;
  next();
};

const Login = async (req, res) => {
  return res.json({
    status: "Logged in",
    User: req.body.username,
    token: req.body.token,
  });
};

const reset_Password = async (req, res) => {
  var user = await User.findOne({ username: req.body.username });
  user.password = req.body.newPassword;
  await user.save();
  return res.json({ status: "Password reset" });
};

const forgot_Password = async (req, res) => {
  const { username, email } = req.body;
  var usernameExists = await User.findOne({ username: username });
  if (!usernameExists) {
    return res.send("No account with username exists");
  }
  async function mail() {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 25,
      secure: true,
      auth: {
        user: "pridhi1667.be20@chitkara.edu.in",
        pass: "Pridhi1667 .",
      },
    });
    var mailDetails = {
      from: "pridhi1667.be20@chitkara.edu.in",
      to: "pridhi1667.be20@chitkara.edu.in",
      subject: "Forgot password OTP",
      text: `1234`,
    };

    await transporter.sendMail(mailDetails, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
  mail().catch(console.error);
  return res.json({ status: "Mail Sent" });
};

module.exports = {
  register,
  Login,
  loginMiddleWare,
  forgot_Password,
  reset_Password,
  key,
};
