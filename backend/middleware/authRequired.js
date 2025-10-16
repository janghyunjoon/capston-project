const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User 모델 경로에 맞게 수정 필요

const COOKIE_NAME = 'token';

// JWT를 검증하고 req.user에 사용자 정보를 추가하여 다음 미들웨어 또는 라우터로 넘기는 함수
const authRequired = async (req, res, next) => {
    // 1. 쿠키에서 토큰 추출
    const token = req.cookies[COOKIE_NAME];
    
    if (!token) {
        // 토큰이 없으면 401 Unauthorized 반환
        return res.status(401).json({ message: '접근 권한이 없습니다. (토큰 없음)' });
    }

    try {
        // 2. 토큰 검증
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. (선택적 보안 강화) 토큰의 사용자 ID로 DB에서 사용자 정보를 다시 확인합니다.
        // 이는 토큰이 유효하더라도 사용자가 그 사이에 삭제되거나 비활성화되었는지 확인합니다.
        const user = await User.findById(decoded.userId).select('-password');

        if (!user || !user.isActive) {
            return res.status(401).json({ message: '유효하지 않은 사용자 또는 비활성화된 계정입니다.' });
        }

        // 4. 요청 객체에 사용자 정보 추가
        req.user = user;
        
        // 5. 다음 미들웨어/라우트 실행
        next();

    } catch (error) {
        // 토큰이 만료되었거나 유효하지 않은 경우
        console.error("JWT 검증 실패:", error.message);
        // 클라이언트에서 재로그인하도록 유도하기 위해 쿠키를 지워줍니다.
        res.clearCookie(COOKIE_NAME); 
        return res.status(401).json({ message: '유효하지 않거나 만료된 토큰입니다.' });
    }
};

module.exports = authRequired;
