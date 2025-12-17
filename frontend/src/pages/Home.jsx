import React from "react";
import Description from "../components/Description";

const Home = () => {
  return (
    <section 
      style={{ 
        backgroundColor: "#000000", 
        minHeight: "100vh", 
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff" // 글자색이 검은색이면 안 보이므로 흰색 추가
      }}
    >
      <Description />
    </section>
  );
};

export default Home;