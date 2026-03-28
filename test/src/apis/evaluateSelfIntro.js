export const evaluateSelfIntroAPI = async (answerText) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  const res = await fetch(`${BASE_URL}/api/evaluate-self-intro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer: answerText }),
  });

  const { totalScore, followUpQuestions } = await res.json();

  return {
    totalScore,
    followUpQuestions,
  };
};