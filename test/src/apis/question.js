export const generateQuestionsAPI = async ({ role, field, count }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  const res = await fetch(`${BASE_URL}/api/question`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role, field, count }),
  });

  const { questions } = await res.json();
  return questions;
};
