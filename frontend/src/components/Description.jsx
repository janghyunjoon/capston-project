import React from 'react'
import "../style/components/Description.scss"
import ChatbotButton from "../components/ChatbotButton";
import Oxquiz from "../pages/Oxquiz";

const Hero = () => {
  return (
    <div className='inner description-inner'>
      {/* 제목 영역: 텍스트만 유지 */}
      <h1 className="tit">
        <span>JUDGE AI</span><br></br>
      </h1>
      <h3 className="tit2">
        <span>자동차 사고를 분석해 주는 AI 서비스입니다.</span>
      </h3>

      {/* 버튼 영역: 두 버튼을 감싸는 그룹 생성 */}
      <div className="hero-button-group">
        <ChatbotButton />
        <Oxquiz />
      </div>

      <p className="txt">
        JUDGE A.I는 교통사고 정황을 파악하고<br/>
        도로교통법, 과실비율 인정기준, 판례 데이터를 종합적으로 분석해<br/>
        가장 객관적인 과실비율을 도출하는 인공지능 서비스입니다.<br/>
      </p>

      <p className='engtxt'>
        JUDGE A.I. is an artificial intelligence service that identifies traffic accident conditions.<br/>
        It comprehensively analyzes road traffic laws, criteria for acknowledging negligence ratios, and case law data.<br/>
        Based on this analysis, it derives the most objective negligence ratios.<br/>
      </p>
    </div>
  )
}

export default Hero;