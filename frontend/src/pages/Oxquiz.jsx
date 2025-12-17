import React, { useEffect, useMemo, useState } from "react";
import { getRandomQuizzes } from "../api/quizapi";
import "../style/pages/Oxquiz.scss";

// 퀴즈 카드 컴포넌트 (내부 사용)
const OxQuizCard = ({ quiz, userAnswer, onAnswer }) => {
  if (!quiz) return null;
  const isAnswered = userAnswer !== null;
  const isCorrect = isAnswered && userAnswer === quiz.answer;

  return (
    <div className="qx-card">
      <div className="qx-question">{quiz.question}</div>
      {!isAnswered && (
        <div className="qx-actions">
          <button className="qx-btn" onClick={() => onAnswer(true)}>O</button>
          <button className="qx-btn" onClick={() => onAnswer(false)}>X</button>
        </div>
      )}
      {isAnswered && (
        <div className={`qx-result ${isCorrect ? "correct" : "wrong"}`}>
          <div className="qx-result-title">{isCorrect ? "⭕ 정답!" : "❌ 오답"}</div>
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

const OxQuiz = () => {
  const QUIZ_COUNT = 3;
  const [isOpen, setIsOpen] = useState(false); // 퀴즈 창 열림 상태
  const [quizzes, setQuizzes] = useState([]);
  const [idx, setIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);

  // 퀴즈 데이터 로드
  useEffect(() => {
    if (isOpen) {
      setQuizzes(getRandomQuizzes(QUIZ_COUNT));
      setIdx(0);
      setUserAnswer(null);
      setScore(0);
    }
  }, [isOpen]);

  const currentQuiz = useMemo(() => quizzes[idx], [quizzes, idx]);

  const handleAnswer = (answerBool) => {
    if (!currentQuiz || userAnswer !== null) return;
    setUserAnswer(answerBool);
    if (answerBool === currentQuiz.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setUserAnswer(null);
    setIdx((prev) => prev + 1);
  };

  const isFinished = idx >= quizzes.length;

  return (
    <>
      {/* 1. 화면에 항상 보이는 시작 버튼 */}
      <div className="qx-start-container">
        <button className="qx-start-btn" onClick={() => setIsOpen(true)}>
          OX 퀴즈 시작하기
        </button>
      </div>

      {/* 2. 버튼 클릭 시 나타나는 퀴즈 오버레이 */}
      {isOpen && (
        <div className="qx-overlay">
          <div className="qx-modal-content">
            <button className="qx-close-x" onClick={() => setIsOpen(false)}>✕</button>
            
            <div className="qx-wrapper">
              <div className="qx-header">
                <h1 className="qx-title">OX 퀴즈</h1>
                <div className="qx-meta">
                  <span>{Math.min(idx + 1, quizzes.length)} / {quizzes.length}</span>
                </div>
              </div>

              {!quizzes.length ? (
                <div className="qx-loading">문제 불러오는 중...</div>
              ) : !isFinished ? (
                <>
                  <OxQuizCard quiz={currentQuiz} userAnswer={userAnswer} onAnswer={handleAnswer} />
                  {userAnswer !== null && (
                    <div className="qx-footer">
                      <button className="qx-next" onClick={handleNext}>다음 문제 →</button>
                    </div>
                  )}
                </>
              ) : (
                <div className="qx-finish">
                  <div className="qx-finish-title">🎉 완료!</div><br></br>
                  <div className="qx-finish-score">최종 점수: {score} / {quizzes.length}</div><br></br>
                  <button className="qx-restart" onClick={() => setIsOpen(false)}>닫기</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OxQuiz;