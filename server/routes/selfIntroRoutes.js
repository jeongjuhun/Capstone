import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import { getSelfIntroEvaluationPrompt } from "../prompts/selfIntroPrompt.js";

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
    console.log("🧠 result 전체 출력:", result);
    console.log("🧠 result.content:", result?.content); // 👈 이게 undefined라면 문제 생김
    console.dir(result, { depth: 5 }); // 객체 구조 확인용

    const content = result.content;
    console.log("📦 GPT 응답 전체 내용:", content);
    const totalScoreMatch = content.match(/총점:\s*(\d{1,3})(?:\/100)?(?:\s*점)?/);

    


    const totalScore = totalScoreMatch ? parseInt(totalScoreMatch[1], 10) : 0;

    const followUpQuestions = [];
    if (totalScore >= 60) {
      const q1Match = content.match(/심층질문1:\s*(.+)/);
      const q2Match = content.match(/심층질문2:\s*(.+)/);
      if (q1Match) followUpQuestions.push(q1Match[1].trim());
      if (q2Match) followUpQuestions.push(q2Match[1].trim());
    } else {
      followUpQuestions.push("자기소개 점수가 부족하여 일반 직무 질문으로 넘어갑니다.");
    }

    res.json({ totalScore, followUpQuestions });
  } catch (err) {
    console.error("자기소개 평가 실패:", err);
    res.status(500).json({ error: "자기소개 평가 실패" });
  }
});

export default router;
