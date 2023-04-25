const express = require("express");
const { CreateBlog, Getblog, deleteblog } = require("./controllers/controller");
const { is_auth } = require("../helper/utils");
const blogRouter = express.Router();

blogRouter
  .route("/Blog")
  .post(is_auth, CreateBlog)
  .get(is_auth, Getblog)
  .delete(is_auth, deleteblog);

module.exports = blogRouter;
