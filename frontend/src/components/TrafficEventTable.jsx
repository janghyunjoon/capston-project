import React, { useEffect, useState } from "react";
import "./TrafficEventTable.css";

const TrafficEventTable = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrafficData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/traffic");
      const data = await res.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error(err);
      setError("데이터를 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrafficData();
    const interval = setInterval(fetchTrafficData, 30000); // 30초마다 자동 새로고침
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
            <th>좌표(X,Y)</th>
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
                <td>{event.coordX}, {event.coordY}</td>
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
