import React from "react";
import { useAuth } from "./AuthContext";

function MyPage() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "40px", color: "#fff" }}>
      <h2>마이페이지</h2>
      <p>환영합니다, {user?.name || "회원"}님!</p>
    </div>
  );
}

export default MyPage;

