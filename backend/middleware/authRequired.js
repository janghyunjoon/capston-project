const jwt = require("jsonwebtoken");
const User = require("../models/User");

const COOKIE_NAME = "token";
const isProd = process.env.NODE_ENV === "production";

const cookieOptions = () => ({
  httpOnly: true,
  secure: isProd,              // production에서만 true
  sameSite: isProd ? "none" : "lax",
  path: "/",
});

const verifyToken = (req, res, next) => {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ message: "접근 권한이 없습니다. (토큰 없음)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decodedToken = decoded;
    next();
  } catch (error) {
    res.clearCookie(COOKIE_NAME, cookieOptions());
    return res.status(401).json({ message: "유효하지 않거나 만료된 토큰입니다." });
  }
};

const authRequired = (req, res, next) => {
  verifyToken(req, res, async () => {
    if (res.headersSent) return;

    try {
      const user = await User.findById(req.decodedToken.userId).select("-password");
      if (!user || !user.isActive) {
        res.clearCookie(COOKIE_NAME, cookieOptions());
        return res
          .status(401)
          .json({ message: "유효하지 않은 사용자 또는 비활성화된 계정입니다." });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("DB 조회 오류:", error);
      return res.status(500).json({ message: "서버 오류 발생" });
    }
  });
};

module.exports = {
  COOKIE_NAME,
  cookieOptions,
  verifyToken,
  authRequired,
};
