import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ⚠️ .env에 넣을 환경변수 이름: TRAFFIC_API_KEY
const API_KEY = process.env.TRAFFIC_API_KEY;

router.get("/", async (req, res) => {
  try {
    // 예시: 국토교통부 실시간 교통정보 API (서울 도로 이벤트)
    const url = `https://apis.data.go.kr/B552061/frequentzoneOld/getRestTrafficEvent?serviceKey=${API_KEY}&type=json&numOfRows=10&pageNo=1`;

    const response = await fetch(url);
    const data = await response.json();

    // API 구조에 맞게 필요한 데이터만 추출
    const events = (data.items?.item || []).map((e) => ({
      eventType: e.eventType,
      roadName: e.roadName,
      startDate: e.startDate,
      lanesBlocked: e.lanesBlocked,
      coordX: e.coordX,
      coordY: e.coordY,
    }));

    res.json({ events });
  } catch (error) {
    console.error("교통데이터 API 오류:", error);
    res.status(500).json({ error: "교통데이터를 불러올 수 없습니다." });
  }
});

export default router;
