import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./components/SelectField.module.css"; // CSS 모듈 임포트

const fields = [
  "백엔드/서버개발",
  "프론트 개발",
  "데이터 분석가",
  "클라우드 엔지니어",
  "정보보안",
];

// 각 분야에 대응하는 역할(role) 매핑
const fieldToRoleMap = {
  "백엔드/서버개발": "backend",
  "프론트 개발": "frontend",
  "데이터 분석가": "data",
  "클라우드 엔지니어": "cloud",
  정보보안: "security",
};

const SelectField = () => {
  const navigate = useNavigate();

  const handleSelect = (field) => {
    const role = fieldToRoleMap[field];
    localStorage.setItem("selectedField", field); // 선택한 분야 저장
    localStorage.setItem("selectedRole", role); // 매칭된 역할 저장
    navigate("/startint"); // 면접 시작 페이지로 이동
  };

  return (
    <div className={styles.selectContainer}>
      <h2>면접 분야를 선택해주세요</h2>
      <div className={styles.selectButtonGroup}>
        {fields.map((field) => (
          <button
            key={field}
            className={styles.selectButton}
            onClick={() => handleSelect(field)}
          >
            {field}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectField;
