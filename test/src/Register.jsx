import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./components/AuthForm.css";

function Register() {
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 정보:", {
      이름: name,
      전화번호: phone,
      생년월일: birth,
    });
    // 여기에 백엔드 연동 또는 저장 로직 추가 가능
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>회원가입</h2>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="생년월일 (8자리, 예: 19990101)"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          pattern="\d{8}"
          title="8자리 생년월일을 입력하세요"
          required
        />
        <button type="submit">가입하기</button>
        <p>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
