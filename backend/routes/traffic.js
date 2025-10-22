import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ✅ 환경변수에서 API 키 로드
const API_KEY = process.env.TRAFFIC_API_KEY;

router.get("/", async (req, res) => {
  try {
    if (!API_KEY) {
      console.error("🚨 TRAFFIC_API_KEY 환경변수가 설정되지 않았습니다.");
      return res.status(500).json({ error: "서버 환경변수(API_KEY)가 누락되었습니다." });
    }

    // ✅ 국토교통부 실시간 교통정보 API (도로 이벤트 예시)
    const url = `https://apis.data.go.kr/B552061/frequentzoneOld/getRestTrafficEvent?serviceKey=${API_KEY}&type=json&numOfRows=10&pageNo=1`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`국토부 API 응답 오류: ${response.status}`);
    }

    const data = await response.json();

    // ✅ 데이터 구조 확인 및 변환
    const rawItems =
      data?.response?.body?.items?.item || data?.body?.items?.item || [];

    const events = rawItems.map((e) => ({
      eventType: e.eventType || "정보 없음",
      roadName: e.roadName || "정보 없음",
      startDate: e.startDate || "-",
      lanesBlocked: e.lanesBlocked || "-",
      coordX: e.coordX || "-",
      coordY: e.coordY || "-",
    }));

    res.json({ events });
  } catch (error) {
    console.error("🚨 교통데이터 API 요청 오류:", error.message);
    res.status(500).json({ error: "교통데이터를 불러올 수 없습니다." });
  }
});

export default router;
