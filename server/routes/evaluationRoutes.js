// 📄 server/routes/evaluationRoutes.js
import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import { getSelfIntroEvaluationPrompt } from "../prompts/selfIntroPrompt.js";
import { answerEvaluationPromptsByRole } from "../prompts/answerEvaluationIndex.js";

const router = express.Router();

router.post("/evaluate-self-intro", async (req, res) => {
  const { answer } = req.body;
  if (!answer) return res.status(400).json({ error: "answer is missing" });

  try {
    const promptTemplate = getSelfIntroEvaluationPrompt();
    const model = new ChatOpenAI({
      temperature: 0.3,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const chain = promptTemplate.pipe(model);
    const result = await chain.invoke({ answer });
    const content = result.content;

    console.log("📦 GPT 응답 전체 내용:", content);

    // ✅ 응답 파싱
    const totalScoreMatch = content.match(/총점:\s*(\d{1,3})/);
    const totalScore = totalScoreMatch ? parseInt(totalScoreMatch[1], 10) : 0;

    const followUpQuestions = [];
    if (totalScore >= 60) {
      const q1Match = content.match(/심층질문1:\s*(.+)/);
      const q2Match = content.match(/심층질문2:\s*(.+)/);
      if (q1Match) followUpQuestions.push(q1Match[1].trim());
      if (q2Match) followUpQuestions.push(q2Match[1].trim());
    }

    res.json({ totalScore, followUpQuestions, content });
  } catch (err) {
    console.error("❌ 자기소개 평가 실패:", err);
    res.status(500).json({ error: "자기소개 평가 실패" });
  }
});

router.post("/evaluate-answer", async (req, res) => {
  const { role, answer } = req.body;
  if (!role || !answer) {
    return res.status(400).json({ error: "role과 answer를 모두 입력해야 합니다." });
  }

  const getPromptTemplate = answerEvaluationPromptsByRole[role];
  if (!getPromptTemplate) {
    return res.status(400).json({ error: `존재하지 않는 role입니다: ${role}` });
  }

  try {
    const promptTemplate = getPromptTemplate();
    const formattedMessages = await promptTemplate.formatMessages({ answer });

    formattedMessages.forEach((msg) => {
      console.log(`[${msg.role}] ${msg.content}\n`);
    });

    const model = new ChatOpenAI({
      temperature: 0.3,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const chain = promptTemplate.pipe(model);
    const result = await chain.invoke({ answer });
    const content = result.content;

    console.log("🧠 GPT 응답 원본:\n" + content);
    res.json({ content });
  } catch (err) {
    console.error("❌ 답변 평가 실패:", err);
    res.status(500).json({ error: "답변 평가 실패" });
  }
});

export default router;
