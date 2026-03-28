import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import { promptsByRole } from "../prompts/promptIndex.js"; 

const router = express.Router();

router.post("/question", async (req, res) => {
  const { role, field, count = 4 } = req.body;

  if (!role || !field) {
    return res.status(400).json({ error: "role 또는 field가 누락되었습니다." });
  }

  const getPromptTemplate = promptsByRole[role];
  if (!getPromptTemplate) {
    return res.status(400).json({ error: "지원하지 않는 role입니다." });
  }

  try {
    const promptTemplate = getPromptTemplate(count);
    const model = new ChatOpenAI({
      temperature: 0.9,
      openAIApiKey: process.env.OPENAI_API_KEY,
      cache: false,
    });

    const chain = promptTemplate.pipe(model);
    const result = await chain.invoke({ field });

    const questions = result.content
      .split("\n")
      .map((q) => q.replace(/^[0-9]+\.\s*/, "").trim())
      .filter(Boolean);

    res.json({ questions });
  } catch (err) {
    console.error("질문 생성 실패:", err);
    res.status(500).json({ error: "질문 생성 실패" });
  }
});

export default router;
