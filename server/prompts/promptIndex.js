import { getBackendPromptTemplate } from "./backendPrompt.js";
import { getFrontendAnswerEvaluationPrompt } from "./frontendAnswerEvaluationPrompt.js";
import { getDataAnalystAnswerEvaluationPrompt } from "./dataAnalystAnswerEvaluationPrompt.js";
import { getCloudAnswerEvaluationPrompt } from "./cloudAnswerEvaluationPrompt.js"; 
import { getSecurityAnswerEvaluationPrompt } from "./securityAnswerEvaluationPrompt.js";

export const promptsByRole = {
  backend: getBackendPromptTemplate,
  frontend: getFrontendAnswerEvaluationPrompt,
  data: getDataAnalystAnswerEvaluationPrompt,
  cloud: getCloudAnswerEvaluationPrompt, 
  security: getSecurityAnswerEvaluationPrompt,
};
