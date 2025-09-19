const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");

// 미들웨어
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONT_ORIGIN,
    credentials: true
}));

// DB 연결
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("연결 성공"))
    .catch((error) => console.log("연결 실패", error));

// 라우터 불러오기
const userRoutes = require("./routes/user");
const infoRoutes = require("./routes/Info"); // 여기 추가

// 라우터 등록
app.use("/user", userRoutes);
app.use("/info", infoRoutes); // 여기 추가

// 루트 테스트
app.get("/", (req, res) => {
    res.json({ message: "Hello Express" });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


