// routes/philosophyQuestion.js
import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const router = express.Router();

router.post("/philosophy-question", async (req, res) => {
  const model = new ChatOpenAI({
    temperature: 0.8,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `
당신은 인사 담당 면접관입니다.
지원자에게 "회사 철학", "조직 문화", "오너의 가치관"과 관련된 인사이트 있는 질문 1개를 생성하세요.

조건:
- 단 하나의 질문만 출력하세요.
- 기업 문화, 창업자 가치관, 팀워크, 리더십 철학 등에서 고르세요.
- 예/아니오 질문은 피하고, 자기 생각을 말할 수 있는 질문이어야 합니다.

출력 형식:
(질문)
      `,
    ],
  ]);

  try {
    const chain = prompt.pipe(model);
    const result = await chain.invoke({});
    res.json({ question: result.content.trim() });
  } catch (err) {
    console.error("🚫 회사 철학 질문 생성 실패:", err);
    res.status(500).json({ error: "회사 철학 질문 생성 실패" });
  }
});

export default router;
