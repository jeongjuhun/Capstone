import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./components/Navbar.module.css";  // CSS 모듈 임포트
import { useAuth } from "./AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>  {/* CSS 모듈 사용 */}
      <Link to="/" className={styles.logo}>AInterview</Link>  {/* CSS 모듈 사용 */}

      <div className={styles.navLinks}>  {/* CSS 모듈 사용 */}
        <Link to="/">홈</Link>
        <Link to="/aboutpage">소개</Link>
        <Link to="/qnapage">QnA</Link>
        <li><Link to="/voicetotext">음성 변환</Link></li>
      </div>

      <div className={styles.navbarRight}>  {/* CSS 모듈 사용 */}
        {user ? (
          <>
            <Link to="/mypage" className={styles.authButton}>마이페이지</Link>  {/* CSS 모듈 사용 */}
            <button onClick={handleLogout} className={styles.authButton}>로그아웃</button>  {/* CSS 모듈 사용 */}
          </>
        ) : (
          <>
            <Link to="/login" className={styles.authButton}>로그인</Link>  {/* CSS 모듈 사용 */}
            <Link to="/register" className={styles.authButton}>회원가입</Link>  {/* CSS 모듈 사용 */}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
