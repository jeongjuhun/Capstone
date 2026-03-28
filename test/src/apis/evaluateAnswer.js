export const evaluateAnswerAPI = async ({ role, answerText }) => {
  // 환경변수 또는 로컬호스트 주소
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  const res = await fetch(`${BASE_URL}/api/evaluate-answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role, answer: answerText }),
  });

  const data = await res.json();

  // ✅ GPT가 생성한 전체 평가 결과만 콘솔에 출력
  console.log("\n🧠 GPT 전체 응답:\n" + data.content);

  return data.content;  // 필요한 건 이 값 하나뿐
};