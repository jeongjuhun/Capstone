import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "./assets/photo1.jpg";
import "./components/Home.css";



const Home = () => {
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    position: "relative",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  return (
    <div>
      
      <div style={backgroundStyle}>
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
          }}
        ></div>
        
        <div className="home-content">
          <h1>AInterview</h1>
          <p>당신만을 위한 맞춤형 면접 연습, 지금 시작해보세요.</p>
            <Link to="/selectfield" className="start-button">
              면접 시작하기
            </Link>
        </div>

      </div>

      
      <section className="features-section">
        {[
          {
            title: "실시간 피드백",
            desc: "AI가 당신의 답변을 분석해 피드백을 제공합니다.",
          },
          {
            title: "몰입감 있는 모의면접",
            desc: "실제 면접처럼 긴장감 있게 연습할 수 있어요.",
          },
          {
            title: "개인 맞춤 질문 제공",
            desc: "당신의 목표에 딱 맞춘 질문들로 준비하세요.",
          },
        ].map((item, index) => (
          <motion.div
            className="feature"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* 푸터 */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 AInterview. All rights reserved.</p>
          <p>문의: limyoonsug9128@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
