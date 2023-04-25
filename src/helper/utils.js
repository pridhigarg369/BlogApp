const { User } = require("../auth/models/user_DB");
var jsonWebToken = require("jsonwebtoken");
const { key } = require("../auth/controllers/controller");

const is_auth = async (req, res, next) => {
  console.log(req.headers.authorization);
  var token = req.headers.authorization;
  if (!token) {
    return res.json({ status: "Error", msg: "Token" });
  }
  try {
    var user = jsonWebToken.verify(token, key);
    if (user && user._id) {
      user = await User.findById(user._id);
      if (!user) {
        return res.json({ status: "error", msg: "invalid User" });
      }
      req.body.user_id = user._id;
      req.user = user;
    } else {
      return res.json({ status: "error", msg: "token invalid" });
    }
  } catch (error) {
    //  console.log(error);
    return res.json({ status: "Invalid id" });
  }
  next();
};

module.exports = {
  is_auth,
};
