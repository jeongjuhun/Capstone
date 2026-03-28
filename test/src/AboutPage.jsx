import React from "react";
import styles from './components/AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContent}>
        <h1>사이트 소개</h1>

        <section>
          <h2>AInterview?</h2>
            <p>
            이 웹사이트는 사용자가 AI 면접을 체험하고 준비할 수 있도록 돕기 위해 제작되었습니다.
            </p>
            <p>
            실제 면접과 유사한 환경을 제공하여 자신감을 높이고 실력을 향상시킬 수 있습니다.
            </p>
        </section>

        <section>
          <h2>주요 기능</h2>
          <ul>
            <li>AI 면접관과의 실시간 모의면접</li>
            <li>카메라, 마이크 테스트 기능</li>
            <li>사용자 맞춤형 면접 질문</li>
          </ul>
        </section>

        <section>
          <h2>🎯개발 목적</h2>
          <p>
            AI 기술을 활용하여 누구나 부담 없이 면접을 연습할 수 있는 기회를 제공하고,
            취업 준비에 실질적인 도움을 주는 것을 목표로 합니다.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

