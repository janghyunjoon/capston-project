import React, { useState } from "react";

const InfoTest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 여기서 원하는 API 경로로 변경
      const res = await fetch("http://localhost:3000/info/events", {
        credentials: "include" // cors에서 credentials:true면 필요
      });
      if (!res.ok) throw new Error("API 호출 실패");

      const result = await res.json();
      setData(result); // { message, data } 형태 그대로 받음
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Info API 테스트</h1>
      <button onClick={fetchData}>API 호출</button>

      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>에러: {error}</p>}

      {data && (
        <pre
          style={{
            background: "#f0f0f0",
            padding: "10px",
            maxHeight: "400px",
            overflowY: "scroll",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default InfoTest;
