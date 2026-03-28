import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import { createFollowup1Prompt } from "../prompts/followupPrompt.js"; // followupPrompt import

const router = express.Router();

// ✅ followup 질문 생성 API
router.post("/followup-question", async (req, res) => {
  const { prev_question, user_answer, job_role } = req.body;

  if (!prev_question || !user_answer || !job_role) {
    return res.status(400).json({ error: "prev_question, user_answer, job_role이 필요합니다." });
  }

  try {
    const promptTemplate = createFollowup1Prompt();
    const model = new ChatOpenAI({
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const chain = promptTemplate.pipe(model);
    const result = await chain.invoke({
      prev_question,
      user_answer,
      job_role,
    });
    

    const followupQuestion = result.content.trim();
    console.log("📦 GPT 응답 전체 내용:", result.content);

    res.json({ followupQuestion });
  } catch (err) {
    console.error("Follow-up 질문 생성 실패:", err);
    res.status(500).json({ error: "Follow-up 질문 생성 실패" });
  }
});

export default router;
