import React, { useEffect, useState } from "react";
import "./TrafficEventTable.css";

const TrafficEventTable = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ 환경 변수 기반으로 백엔드 주소 설정
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchTrafficData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/traffic`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      const data = await response.json();
      const eventList = data?.body?.items?.item || data?.events || [];
      setEvents(eventList);
    } catch (err) {
      console.error("🚨 교통 데이터 요청 실패:", err.message);
      setError("⚠️ 서버 연결 실패 또는 데이터를 불러올 수 없습니다.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrafficData();
    const interval = setInterval(fetchTrafficData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="traffic-loading">🚗 실시간 교통 데이터 로딩 중...</p>;
  if (error) return <p className="traffic-error">{error}</p>;

  return (
    <div className="traffic-container">
      <h2>실시간 교통 이벤트 현황</h2>
      <table className="traffic-table">
        <thead>
          <tr>
            <th>이벤트유형</th>
            <th>도로명</th>
            <th>발생시각</th>
            <th>차단차로</th>
            <th>좌표(X, Y)</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event, i) => (
              <tr key={i}>
                <td>{event.eventType || "-"}</td>
                <td>{event.roadName || "-"}</td>
                <td>{event.startDate || "-"}</td>
                <td>{event.lanesBlocked || "-"}</td>
                <td>
                  {event.coordX && event.coordY
                    ? `${event.coordX}, ${event.coordY}`
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">현재 이벤트가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrafficEventTable;
