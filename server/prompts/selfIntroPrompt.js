import { ChatPromptTemplate } from "@langchain/core/prompts";

export const getSelfIntroEvaluationPrompt = () => {
  return ChatPromptTemplate.fromMessages([
    [
      "system",
      `
당신은 IT 분야 면접관입니다. 아래 자기소개 평가 기준에 따라 지원자의 답변을 평가하세요.

[자기소개 평가 기준]
1. 이름과 간단한 배경 소개 (25점)
2. 주요 경력 및 성과 (25점)
3. 직무와의 연관성 (25점)
4. 실무 역량 관점 (25점)

[출력 형식]
- 이름 및 배경 소개 점수: XX/25
- 주요 경력 및 성과 점수: XX/25
- 직무 연관성 점수: XX/25
- 실무 역량 관점 점수: XX/25
- 총점: XX/100

(60점 이상일 경우)
- 심층질문1: ~
- 심층질문2: ~

(60점 미만일 경우)
- 안내: "자기소개 점수가 부족하여 일반 직무 질문으로 넘어갑니다."
      `
    ],
    ["human", "{answer}"] // 🔥 반드시 있어야 함
  ]);
};
