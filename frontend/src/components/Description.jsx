import React from 'react'
import "../style/components/Description.scss"
import ChatbotButton from "../components/ChatbotButton";
import Oxquiz from "../pages/Oxquiz";

const Hero = () => {
  return (
    <div className='inner description-inner'>
      {/* 제목 영역: 텍스트만 유지 */}
      <h1 className="tit">
        <span>자동차사고 과실비율 측정 AI</span>
      </h1>

      {/* 버튼 영역: 두 버튼을 감싸는 그룹 생성 */}
      <div className="hero-button-group">
        <ChatbotButton />
        <Oxquiz />
      </div>

      <p className="txt">
        교통사고 발생 시 상황을 분석하여<br/>
        도로교통법, 과실비율 인정기준, 판례 데이터 등을 종합분석하여<br/>
        객관적인 과실비율을 제시하는 A.I 서비스입니다.<br/>
      </p>

      <p className='engtxt'>
        We'll analyze the situation in the event of a traffic accident<br/>
        By comprehensively analyzing the Road Traffic Act, the criteria for recognizing the percentage of negligence, and case law data<br/>
        It is a service that presents an objective percentage of negligence.<br/>
      </p>
    </div>
  )
}

export default Hero;