import React, { useState } from "react";
import styles from "./components/QnaPage.module.css"; 

const QnaPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const faqData = [
    { question: "사이트는 어떤 기능을 제공하나요?", answer: "우리 사이트는 AI 면접을 제공하며, 면접 준비와 피드백을 받을 수 있습니다." },
    { question: "AI 면접은 어떻게 시작하나요?", answer: "회원가입 후, 면접 시작 버튼을 눌러 AI 면접을 시작할 수 있습니다." },
    { question: "카메라가 잘 작동되는지 알수있나요?", answer: "면접 시작하기 전 테스트를 해볼 수 있습니다." },
    { question: "사이트 디자인이 너무 예쁜데 어떻게 꾸미셨나요?", answer: "열심히 했습니다." },
  ];

  return (
    <div className={styles.qnaPage}>
      <h1 className={styles.title}>Q&A</h1>
      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <div className={styles.faqQuestion} onClick={() => toggleAnswer(index)}>
              <span>{item.question}</span>
              <span className={`${styles.toggleIcon} ${openIndex === index ? styles.toggleIconOpen : ""}`}>▶</span>
            </div>
            {openIndex === index && <div className={styles.faqAnswer}>{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnaPage;
