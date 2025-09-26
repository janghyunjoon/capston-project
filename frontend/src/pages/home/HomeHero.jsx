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
    return (
        <div className='homeHero'>
            <Swiper
                navigation={true}
                // 🚨 modules에 Autoplay를 포함합니다.
                modules={[Navigation, Pagination, Autoplay, A11y]} 
                pagination={{ clickable: true }}
                a11y={{ enabled: true }}
                slidesPerView={1}
                loop
                
                // 🚨 Autoplay 속성 추가 (3초마다 전환)
                autoplay={{
                    delay: 3000, 
                    disableOnInteraction: false,
                }}
            >
                {homeSlides.map(({ id, img, title, subtitle, href, subtitleHref }) => {
                    
                    // subtitle에 링크를 조건부로 적용하는 로직
                    const subtitleContent = subtitleHref ? (
                        <a 
                            href={subtitleHref} 
                            className='subtitle-link' 
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
                    return (
                        <SwiperSlide key={id}>
                            <a href={href} className='slide-link'>
                                {card}
                            </a>
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </div>
    )
}

export default HomeHero