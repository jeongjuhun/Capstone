import { getBackendAnswerEvaluationPrompt } from "./backendAnswerEvaluationPrompt.js";
import { getFrontendAnswerEvaluationPrompt } from "./frontendAnswerEvaluationPrompt.js";
import { getDataAnalystAnswerEvaluationPrompt } from "./dataAnalystAnswerEvaluationPrompt.js";
import { getCloudAnswerEvaluationPrompt } from "./cloudAnswerEvaluationPrompt.js"; 
import { getSecurityAnswerEvaluationPrompt } from "./securityAnswerEvaluationPrompt.js";
// 2025-05-13 - 철학 질문에 대한 평가 프롬프트 추가
import { getPhilosophyAnswerEvaluationPrompt } from "./philosophyAnswerPrompt.js";

export const answerEvaluationPromptsByRole = {
  backend: getBackendAnswerEvaluationPrompt,
  frontend: getFrontendAnswerEvaluationPrompt,
  data: getDataAnalystAnswerEvaluationPrompt,
  cloud: getCloudAnswerEvaluationPrompt, 
  security: getSecurityAnswerEvaluationPrompt,
  // 2025-05-13 - 철학 질문에 대한 평가 프롬프트 추가
  philosophy: getPhilosophyAnswerEvaluationPrompt,
};
