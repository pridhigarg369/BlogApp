const { Blog } = require("../models/blog_DB");

const CreateBlog = async (req, res) => {
  var exists = await Blog.find({ title: req.body.title });
  if (!exists) {
    var newBlog = await Blog.create(req.body);
    return res.json({ status: "Done", newBlog });
  } else {
    return res.json({ status: "error", msg: "Blog with this Title exists" });
  }
};

const Getblog = async (req, res) => {
  var blogs = await Blog.find({ user_id: req.user });
  return res.send({ blogs: blogs });
};

const deleteblog = async (req, res) => {
  var title = await Blog.findOne({
    $and: [{ title: req.body.title }, { user_id: req.user }],
  });
  if (title) {
    await Blog.deleteOne(title);
    return res.json({ status: "deleted" });
  } else {
    return res.status(404).json({
      status: "Error",
      msg: "Invalid request: Either title or id invalid",
    });
  }
};
module.exports = { CreateBlog, Getblog, deleteblog };
