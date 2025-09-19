require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(cookieParser())

// 라우터 불러오기
const infoRoutes = require('./routes/Info')
app.use('/info', infoRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
