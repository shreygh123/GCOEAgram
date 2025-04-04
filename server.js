const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const path = require("path");
const authRoute = require("./routes/authUser");
const post = require("./routes/post");
const register = require("./routes/userRegister");
const event = require("./routes/event");
const oppo = require("./routes/oppo");
const mentoring = require("./routes/mentoring");
const scholarship = require("./routes/scholarships");
const resource = require("./routes/resource");
const Group = require("./routes/group");
const groupchat = require("./routes/groupchat");
const notify = require("./routes/notify");
require('./routes/userRegister');
dotenv.config();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/pdf", express.static(path.join(__dirname, "/pdf")));
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected");groupchat
    }
  }
);
  
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ status: true, message: "File has been uploaded" });
});
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "pdf");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploadpdf = multer({ storage: pdfStorage });
app.post("/api/upload/pdf", uploadpdf.single("file"), (req, res) => {
  res.status(200).json({ status: true, message: "File has been uploaded" });
});
app.use("/api/auth/", authRoute);
app.use("/api/post/", post);
app.use("/api/", register);
app.use("/api/event/", event);
app.use("/api/oppo/", oppo);
app.use("/api/mentoring/", mentoring);
app.use("/api/scholarship/", scholarship);
app.use("/api/resource/", resource);
app.use("/api/group/", Group);
app.use("/api/chat/", groupchat);
app.use("/api/noti/", notify);

// app.use("/api/users",userRoute);
// app.use("/api/posts",postRoute);
// app.use("/api/categories",categoryRoute);

app.listen("4000", () => {
  console.log("Server started at port 4000");
});
