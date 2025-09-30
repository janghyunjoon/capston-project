import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// 🚨 Autoplay 모듈을 사용합니다.
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HomeHero.css'
import { homeSlides } from '../../data/homeSlide'

const HomeHero = () => {
    // ... (Swiper 설정 동일)
    return (
        <div className='homeHero'>
            <Swiper
                // ... (Swiper props 동일)
            >
                {homeSlides.map(({ id, img, title, subtitle, href, subtitleHref }) => {
                    
                    const subtitleContent = subtitleHref ? (
                        <a 
                            href={subtitleHref} 
                            className='subtitle-link' 
                            // 💡 내부 <a> 클릭 시, 상위 div의 이벤트 전파를 막습니다.
                            onClick={(e) => e.stopPropagation()} 
                        >
                            {subtitle}
                        </a>
                    ) : (
                        subtitle
                    );

                    const card = (
                        <figure
                            className='slide-card'
                            aria-label={title}
                            style={{ backgroundImage: `url(${img})` }} 
                        >
                            <div className="t-wrap">
                                <h2>{title}</h2>
                                <p>{subtitleContent}</p>
                            </div>
                        </figure>
                    )
                    
                    // 💡 SwiperSlide를 <div>로 감싸고 onClick 이벤트를 추가하여 전체 슬라이드를 링크처럼 만듭니다.
                    return (
                        <SwiperSlide key={id}>
                            {/* ❌ 이전의 바깥쪽 <a>를 제거하고 <div>로 변경 */}
                            <div 
                                className='slide-wrapper' // 새로운 클래스명 부여
                                style={{cursor: 'pointer'}} // 클릭 가능한 UI 제공
                                onClick={() => {
                                    window.location.href = href;
                                }}
                            >
                                {card}
                            </div>
                            {/* 💡 이제 중첩된 <a>는 subtitleContent 내부의 <a> 하나만 남습니다. */}
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </div>
    )
}

export default HomeHero