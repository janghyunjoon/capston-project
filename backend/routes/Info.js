const express = require("express")
const router = express.Router()
const axios = require("axios")

//chat
// App.tsx
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export const App = () => {
	useEffect(() => {
		createChat({
			webhookUrl: 'https://sole-mighty-seriously.ngrok-free.app/webhook/82edfa8d-d7c2-4401-91c9-9f4b57d88529/chat'
		});
	}, []);

	return (<div></div>);
};

// .env에서 API_KEY 불러오기
const API_KEY = process.env.API_KEY || 'test'

// GET /info/events
router.get("/events", async (req, res) => {
  try {
    const url = `https://openapi.its.go.kr:9443/eventInfo?apiKey=${API_KEY}&type=all&eventType=all&minX=126.800000&maxX=127.890000&minY=34.900000&maxY=35.100000&getType=json`
    
    const response = await axios.get(url)
    const data = response.data

    // 필요시 데이터 가공 가능
    res.status(200).json({ message: "데이터 가져오기 성공", data })
  } catch (error) {
    console.error("외부 API 호출 오류", error.message)
    res.status(500).json({ message: "외부 API 호출 실패" })
  }
})

module.exports = router
