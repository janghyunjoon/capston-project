const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const userRouter = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(
  cors({
    origin: process.env.FRONT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 라우트
app.use("/api/user", userRouter);

// 루트 테스트
app.get("/", (req, res) => {
  res.json({ message: "Hello Express" });
});

// DB 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB 연결 성공");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB 연결 실패:", err));
