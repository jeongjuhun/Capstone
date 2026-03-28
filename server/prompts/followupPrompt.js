import { PromptTemplate } from "@langchain/core/prompts";

export const createFollowup1Prompt = () => {
  const template = `
당신은 '{job_role}' 직군의 AI 면접관입니다.

지원자가 '1분 자기소개'에 답변했습니다.  
이제 자기소개 내용을 바탕으로 더 구체적으로 묻고 싶은 후속 질문 1개를 생성하세요.

후속 질문은 다음과 같은 요소 중 부족하거나 더 알고 싶은 내용을 중심으로 만드세요:

[자기소개에 포함되어야 할 구성 요소]
1. 이름과 간단한 배경 소개
2. 주요 경력 및 성과
3. 직무와의 연관성
4. 실무에 필요한 역량

⛔ 반드시 후속 질문 1개만 작성하세요. 질문은 간결하고 명확하게 작성하세요.

[1분 자기소개 질문]
{prev_question}

[지원자 답변]
{user_answer}

[follow-up 질문 1]
`;
  return PromptTemplate.fromTemplate(template);
};

export const createFollowup2Prompt = () => {
  const template = `
당신은 '{job_role}' 직군의 AI 면접관입니다.

지원자가 아래 follow-up 질문에 답변했습니다.  
이제 이 답변을 바탕으로 더 심층적으로 탐색할 수 있는 follow-up 질문 1개를 생성하세요.

질문은 지원자의 **책임, 문제 해결 방식, 팀과의 협업**, 또는 **기술적 선택 이유** 등에 대해  
더 깊이 있게 파악할 수 있도록 구성하세요.

⛔ 반드시 follow-up 질문 1개만 출력하세요. 명확하고 간결한 문장으로 작성하세요.

[follow-up 질문 1]
{followup_1}

[지원자 답변]
{user_followup_answer}

[follow-up 질문 2]
`;
  return PromptTemplate.fromTemplate(template);
};
    