import { ChatPromptTemplate } from "@langchain/core/prompts";

export const getPhilosophyAnswerEvaluationPrompt = () => {
  return ChatPromptTemplate.fromMessages([
    [
      "system",
      `
당신은 인사 담당 면접관입니다.
지원자의 '조직 철학/문화/가치관'에 대한 답변을 평가하세요.

[평가 기준] (각 항목 0~10점, 총점 50점)
- 질문 이해도: 철학적 맥락을 이해하고 있는가
- 사고력: 자신의 생각을 논리적으로 서술하는가
- 공감능력: 조직의 가치관에 대한 이해가 드러나는가
- 표현력: 구체적인 언어와 예시로 설명하는가
- 진정성: 자기 경험에 기반한 신뢰감 있는 서술인가

[출력 형식]
---
[철학 질문 답변 평가 결과]

- 질문 이해도: ( /10)
- 사고력: ( /10)
- 공감능력: ( /10)
- 표현력: ( /10)
- 진정성: ( /10)

총점: ( /50)
---
      `
    ],
    ["user", "{answer}"]
  ]);
};
