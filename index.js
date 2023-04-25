const server = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./src/auth/router");
const blogRouter = require("./src/blogs/router");

mongoose.connect("mongodb://localhost:27017/Blog_G4");
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
const app = server();
//COMPRESSION MIDDLEWARE MODULE as first middleware function, which compresses assets before they’re returned to the browser
app.use(compression());
app.use(cors());
app.use(bodyParser.json()); // bodyparser middleware extracts the parameter from the request, parses it and makes it available req.body so we can access the parameters by their specific name

app.use("/auth", authRouter);
app.use("/blog", blogRouter);
//404 error handler middleware
app.get("/", (req, res) => {
  res.status(404).send("BLOG App");
});

// We disabled express identification (Doing this would save a few bytes on our HTTP request, and will also give malicious hackers less information about your Node.js technology stack.)
app.disable("x-powered-by");

app.listen(4590, () => {
  console.log("Server Active on PORT 4590");
});
