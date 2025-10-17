// src/layouts/MainLayout.jsx

const MainLayout = () => {
  return (
    <>
      <Header />
      <ChatbotButton />

      <div className="main">
        {/* 👇 1번으로 이게 먼저 나옵니다. */}
        <Description /> 
        
        {/* 👇 2번으로 Home(HomeHero)이 여기에 나옵니다. */}
        <Outlet /> 
        
        {/* 👇 3번으로 테이블이 나옵니다. */}
        <TrafficEventTable />
      </div>
    </>
  );
};