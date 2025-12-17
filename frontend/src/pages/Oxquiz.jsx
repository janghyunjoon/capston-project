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
  const BATCH_COUNT = 3; // 한 번에 뽑아둘 문제 수
  const [isOpen, setIsOpen] = useState(false);

  const [quizzes, setQuizzes] = useState([]);
  const [idx, setIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);

  const loadMore = () => {
    const more = getRandomQuizzes(BATCH_COUNT);
    setQuizzes((prev) => [...prev, ...more]);
  };

  // 퀴즈 창 열릴 때 초기화 + 첫 문제 로드
  useEffect(() => {
    if (isOpen) {
      setQuizzes([]);
      setIdx(0);
      setUserAnswer(null);

      const first = getRandomQuizzes(BATCH_COUNT);
      setQuizzes(first);
    }
  }, [isOpen]);

  const currentQuiz = useMemo(() => quizzes[idx], [quizzes, idx]);

  // 끝에 가까워지면 미리 다음 배치를 더 붙여서 "무한"처럼 이어지게
  useEffect(() => {
    if (!isOpen) return;
    if (!quizzes.length) return;

    const remaining = quizzes.length - idx;
    if (remaining <= 1) {
      loadMore();
    }
  }, [idx, quizzes.length, isOpen]);

  const handleAnswer = (answerBool) => {
    if (!currentQuiz || userAnswer !== null) return;
    setUserAnswer(answerBool);
  };

  const handleNext = () => {
    setUserAnswer(null);
    setIdx((prev) => prev + 1);
  };

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
              </div>

              {!currentQuiz ? (
                <div className="qx-loading">문제 불러오는 중...</div>
              ) : (
                <>
                  <OxQuizCard
                    quiz={currentQuiz}
                    userAnswer={userAnswer}
                    onAnswer={handleAnswer}
                  />

                  {userAnswer !== null && (
                    <div className="qx-footer" style={{ display: "flex", gap: 10 }}>
                      <button className="qx-next" onClick={handleNext}>
                        다음 문제 →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OxQuiz;
