const express = require("express")
const router = express.Router()
const axios = require("axios")

// .env에서 API_KEY 불러오기
const API_KEY = process.env.API_KEY || 'test'

// GET /info/events
router.get("/events", async (req, res) => {
    try {
        // ITS Open API URL (Traffic Events)
        const url = `https://openapi.its.go.kr:9443/eventInfo?apiKey=${API_KEY}&type=all&eventType=all&minX=126.800000&maxX=127.890000&minY=34.900000&maxY=35.100000&getType=json`
        
        const response = await axios.get(url)
        const data = response.data

        // 데이터 가공 가능
        res.status(200).json({ message: "데이터 가져오기 성공", data })
    } catch (error) {
        console.error("외부 API 호출 오류", error.message)
        res.status(500).json({ message: "외부 API 호출 실패" })
    }
})

module.exports = router
