import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
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
                navigation={true}
                modules={[Navigation, Pagination, Autoplay, A11y]}
                pagination={{ clickable: true }}
                a11y={{ enabled: true }}
                slidesPerView={1}
                loop
                autoplay={{
                    delay: 3000,        // 3초마다 자동으로 슬라이드 이동
                    disableOnInteraction: false, // 사용자가 슬라이드 건드려도 자동 재생 유지
                }}
                speed={1000}     
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

                    
                    return (
                        <SwiperSlide key={id}>
                            
                            <div
                                className='slide-wrapper' // 새로운 클래스명 부여
                                style={{ cursor: 'pointer' }} // 클릭 가능한 UI 제공
                                onClick={() => {
                                    window.location.href = href;
                                }}
                            >
                                {card}
                            </div>
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </div>
    )
}

export default HomeHero