import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./components/AuthForm.css";

function Login() {
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 정보:", {
      전화번호: phone,
      생년월일: birth,
    });
    // 여기에 로그인 검증 로직 추가 가능
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>로그인</h2>
        <input
          type="tel"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="생년월일 (8자리)"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          pattern="\d{8}"
          title="8자리 생년월일을 입력하세요"
          required
        />
        <button type="submit">로그인</button>
        <p>
          계정이 없으신가요? <Link to="/register">회원가입</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
