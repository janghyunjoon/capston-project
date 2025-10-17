// src/components/TopBanner.jsx (새 파일)

import React, { useState } from 'react';
import './TopBanner.css'; // 배너 스타일을 위한 CSS 파일

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true); // 배너 보이기/숨기기 상태

  const handleClose = () => {
    setIsVisible(false); // 닫기 버튼 클릭 시 배너 숨김
  };

  if (!isVisible) {
    return null; // isVisible이 false면 아무것도 렌더링하지 않음
  }

  return (
    <div className="top-banner">
      <div className="top-banner-content">
        {/* 주신 이미지의 좌측 이미지 부분 */}
        <div className="top-banner-image">
          {/* 이미지를 배경으로 하거나 <img> 태그 사용 */}
          <img src="/path/to/your/image.png" alt="혜택 이미지" /> 
        </div>

        {/* 주신 이미지의 우측 텍스트 부분 */}
        <div className="top-banner-text">
          <p>이런이런 이용자라면 첫 결제 혜택 받아요</p>
          <p><strong>지금 프리미어 리뷰로 매출 성장시켜!</strong></p>
        </div>
      </div>
      
      {/* 닫기 버튼 */}
      <button className="top-banner-close-btn" onClick={handleClose}>
        &times; {/* X 아이콘 */}
      </button>
    </div>
  );
};

export default TopBanner;