const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { COOKIE_NAME, cookieOptions, verifyToken, authRequired } = require("../middleware/authRequired");

const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30분

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || typeof username !== "string") {
      return res.status(400).json({ message: "아이디(username)를 입력하세요." });
    }
    if (!password || typeof password !== "string") {
      return res.status(400).json({ message: "비밀번호(password)를 입력하세요." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "비밀번호는 최소 6자 이상이어야 합니다." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 사용자입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: "회원가입이 완료 되었습니다." });
  } catch (error) {
    console.error("signup error:", error);
    return res.status(500).json({ message: "서버 오류 발생" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "아이디/비밀번호를 입력하세요." });
    }

    const user = await User.findOne({ username }).select("+password");
    if (!user) return res.status(401).json({ message: "사용자 없음" });

    // 잠금 상태 처리 (isActive=false면 잠금으로 간주)
    if (!user.isActive) {
      if (user.failedLoginAttempts >= 5 && user.lastLoginAttempt) {
        const timeElapsed = Date.now() - new Date(user.lastLoginAttempt).getTime();

        if (timeElapsed > LOCKOUT_DURATION_MS) {
          user.isActive = true;
          user.failedLoginAttempts = 0;
          await user.save();
        } else {
          const remainingMinutes = Math.ceil((LOCKOUT_DURATION_MS - timeElapsed) / (60 * 1000));
          return res
            .status(401)
            .json({ message: `계정이 잠금 상태입니다. ${remainingMinutes}분 후 다시 시도해 주세요.` });
        }
      } else {
        return res.status(401).json({ message: "비활성/잠금 계정입니다. 잠시 후 다시 시도하세요." });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // 비밀번호 틀림 → 실패횟수 증가 + 잠금 처리
    if (!isMatch) {
      user.failedLoginAttempts += 1;
      user.lastLoginAttempt = new Date();

      if (user.failedLoginAttempts >= 5) {
        user.isActive = false;
        await user.save();
        return res.status(401).json({ message: "비밀번호 5회 이상 오류, 계정이 잠겼습니다." });
      }

      await user.save();
      return res.status(401).json({
        message: "비밀번호가 틀렸습니다.",
        failedAttempt: user.failedLoginAttempts,
      });
    }

    // 성공 → 상태 초기화
    user.failedLoginAttempts = 0;
    user.lastLoginAttempt = new Date();
    user.isLoggedIn = true;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie(COOKIE_NAME, token, {
      ...cookieOptions(),
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({
      message: "로그인 성공",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("login error:", error);
    return res.status(500).json({ message: "서버오류" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) {
      // 이미 쿠키가 없으면 그냥 성공 처리해도 무방
      return res.status(200).json({ message: "로그아웃 되었습니다." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (user) {
        user.isLoggedIn = false;
        await user.save();
      }
    } catch (err) {
      // 토큰이 깨졌어도 쿠키는 지우면 됨
      console.log("토큰 검증 오류(로그아웃):", err.message);
    }

    res.clearCookie(COOKIE_NAME, cookieOptions());
    return res.status(200).json({ message: "로그아웃 되었습니다." });
  } catch (error) {
    console.error("logout error:", error);
    return res.status(500).json({ message: "서버 오류가 발생" });
  }
});

// 토큰 유효성만 확인(쿠키가 유효하면 true)
router.post("/verify-token", verifyToken, (req, res) => {
  return res.status(200).json({ isValid: true, user: req.decodedToken });
});

// 현재 로그인 사용자 정보
router.get("/me", authRequired, (req, res) => {
  const userWithoutPassword = req.user.toObject();
  delete userWithoutPassword.password;

  return res.status(200).json({
    message: "현재 로그인된 사용자 정보입니다.",
    user: userWithoutPassword,
  });
});

module.exports = router;
