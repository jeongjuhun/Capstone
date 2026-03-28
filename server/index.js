// server/index.js

// 1. 기본 라이브러리
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// 2. routes 불러오기
import questionRoutes from "./routes/questionRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import selfIntroRoutes from "./routes/selfIntroRoutes.js";
import followupRoutes from "./routes/followupRoutes.js";
import philosophyQuestionRoute from "./routes/philosophyQuestionRoute.js";

// 3. 환경변수 로드
dotenv.config();

const app = express();

// 4. CORS 설정: 로컬 개발용과 배포된 프론트엔드 도메인만 허용
const allowedOrigins = [
  "http://localhost:5173",      // Vite 개발 서버
  process.env.FRONTEND_URL      // 배포 시 이 환경변수에 실제 도메인 지정
];
app.use(cors({
  origin: (origin, callback) => {
    // origin이 없으면 Postman·curl 등도 허용
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS 차단: 허용되지 않은 출처 ${origin}`));
  }
}));

// 5. JSON body 파싱
app.use(express.json());

// 6. routes 등록하기
app.use("/api", questionRoutes);
app.use("/api", evaluationRoutes);
app.use("/api", selfIntroRoutes);
app.use("/api", followupRoutes);
app.use("/api", philosophyQuestionRoute);

// 7. 서버 작동 확인용
app.get("/", (req, res) => {
  res.send("✅ LangChain 서버 정상 작동 중입니다.");
});

// 8. 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ LangChain 백엔드 서버 실행 중 👉 http://localhost:${PORT}`);
});
