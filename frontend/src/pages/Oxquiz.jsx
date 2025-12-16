// src/pages/Qxquiz.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getRandomQuizzes } from "../api/quizapi"
import "../style/pages/Oxquiz.scss";

const OxQuizCard = ({ quiz, userAnswer, onAnswer }) => {
  if (!quiz) return null;

  const isAnswered = userAnswer !== null;
  const isCorrect = isAnswered && userAnswer === quiz.answer;

  return (
    <div className="qx-card">
      <div className="qx-question">{quiz.question}</div>

      {!isAnswered && (
        <div className="qx-actions">
          <button className="qx-btn" onClick={() => onAnswer(true)}>
            O
          </button>
          <button className="qx-btn" onClick={() => onAnswer(false)}>
            X
          </button>
        </div>
      )}

      {isAnswered && (
        <div className={`qx-result ${isCorrect ? "correct" : "wrong"}`}>
          <div className="qx-result-title">
            {isCorrect ? "⭕ 정답!" : "❌ 오답"}
          </div>

          {!isCorrect && (
            <div className="qx-explain">
              <div className="qx-explain-title">왜 틀렸을까요?</div>
              <div className="qx-explain-body">{quiz.explanation}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Qxquiz = () => {
  // 원하는 문제 수만 바꾸면 됨
  const QUIZ_COUNT = 3;

  const [quizzes, setQuizzes] = useState([]);
  const [idx, setIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const currentQuiz = useMemo(() => quizzes[idx], [quizzes, idx]);

  useEffect(() => {
    // ✅ 랜덤 퀴즈 세팅
    setQuizzes(getRandomQuizzes(QUIZ_COUNT));
  }, []);

  const handleAnswer = (answerBool) => {
    if (!currentQuiz) return;
    if (userAnswer !== null) return; // 중복 클릭 방지

    setUserAnswer(answerBool);
    if (answerBool === currentQuiz.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setUserAnswer(null);
    setIdx((prev) => prev + 1);
  };

  const handleRestart = () => {
    setQuizzes(getRandomQuizzes(QUIZ_COUNT));
    setIdx(0);
    setUserAnswer(null);
    setScore(0);
  };

  // ✅ 데이터 로딩/가드
  if (!quizzes.length) {
    return <div className="qx-wrapper">문제 불러오는 중...</div>;
  }

  const isFinished = idx >= quizzes.length;

  return (
    <div className="qx-wrapper">
      <div className="qx-header">
        <h1 className="qx-title">OX 퀴즈</h1>
        <div className="qx-meta">
          <span>
            {Math.min(idx + 1, quizzes.length)} / {quizzes.length}
          </span>
          <span>점수: {score}</span>
        </div>
      </div>

      {!isFinished ? (
        <>
          <OxQuizCard
            quiz={currentQuiz}
            userAnswer={userAnswer}
            onAnswer={handleAnswer}
          />

          {userAnswer !== null && (
            <div className="qx-footer">
              <button className="qx-next" onClick={handleNext}>
                다음 문제 →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="qx-finish">
          <div className="qx-finish-title">🎉 퀴즈 완료!</div>
          <div className="qx-finish-score">
            최종 점수: <b>{score}</b> / {quizzes.length}
          </div>
          <button className="qx-restart" onClick={handleRestart}>
            다시 풀기
          </button>
        </div>
      )}
    </div>
  );
};

export default Qxquiz;
