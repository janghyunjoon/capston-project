const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

const userRouter = require("./routes/user");
const infoRouter = require("./routes/info");

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(cors({
  origin: process.env.FRONT_ORIGIN || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 라우트
app.use("/api/user", userRouter);
app.use("/api/info", infoRouter);

// ✅ [추가] 실시간 교통상황 API 프록시 라우트
app.get("/api/traffic", async (req, res) => {
  try {
    const response = await axios.get("https://openapi.its.go.kr:9443/eventInfo", {
      params: {
        apiKey: process.env.LTS_API_KEY,  // 🔒 .env에 저장된 LTS 인증키
        type: "all",                      // 전체 도로
        eventType: "all",                 // 전체 이벤트
        minX: 126.8,                      // 서울 기준 예시 좌표
        maxX: 127.9,
        minY: 34.9,
        maxY: 37.6,
        getType: "json"
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("🚨 교통 API 요청 실패:", error.message);
    res.status(500).json({ error: "교통 API 요청 실패" });
  }
});

// 루트 테스트
app.get("/", (req, res) => {
  res.json({ message: "Hello Express" });
});

// DB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB 연결 성공");
    // DB 연결 성공 시 서버 실행
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB 연결 실패:", err));
