import React from 'react'
import "../style/components/Description.scss"
import ChatbotButton from "../components/ChatbotButton";
import Oxquiz from "../pages/Oxquiz";
const Hero = () => {
  return (
    <div className='inner description-inner'>
<<<<<<< HEAD
      <p className="tit">
        자동차사고 과실비율
      </p>
=======
      <h1 className="tit">
        <span>
          자동차사고 과실비율 측정 AI
        </span>
        <ChatbotButton />
        <Oxquiz />
      </h1>
>>>>>>> hyunjoon2
      <p className="txt">
        AI에게 질문해 보세요
        </p>
        <p className='engtxt'>
        사고 경험이 없어도 누구나 이용가능하도록 준비했어요
      </p>
    </div>
  )
}

export default Hero