// File: C:/Capstone/test/src/InterviewRoom.jsx

import React, { useEffect, useRef, useState } from "react";
import { evaluateSelfIntroAPI } from "./apis/evaluateSelfIntro";
import { generateQuestionsAPI } from "./apis/question";
import { evaluateAnswerAPI } from "./apis/evaluateAnswer";
import { generateCompanyPhilosophyQuestionAPI } from "./apis/philosophyQuestion";

import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

import "./components/InterviewRoom.css";

const InterviewRoom = () => {
  const userVideoRef   = useRef(null);
  const recognitionRef = useRef(null);
  const nodCountRef    = useRef(0);
  const lastYRef       = useRef(null);

  const [nods, setNods]               = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions]     = useState([
    { text: "1분 자기소개를 해주세요.", type: "selfIntro" }
  ]);
  const [finalAnswerText, setFinalAnswerText] = useState("");
  const [sttLoading, setSttLoading]           = useState(false);
  const [aiImage, setAiImage]                 = useState("50.png");
  const [timeLeft, setTimeLeft]               = useState(90);
  const [timerRunning, setTimerRunning]       = useState(false);
  const [showWarning, setShowWarning]         = useState(false);

  const [field] = useState(localStorage.getItem("selectedField") || "프론트 개발");
  const [role]  = useState(localStorage.getItem("selectedRole") || "frontend");

  const WARNING_THRESHOLD = 10;

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = userVideoRef.current;
        video.srcObject = stream;
        video.play().catch(() => {});
      })
      .catch(err => console.error("카메라 접근 실패:", err));
  }, []);

  useEffect(() => {
    if (!userVideoRef.current) return;

    const faceMesh = new FaceMesh({
      locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    const NOD_THRESHOLD = 0.008;

    faceMesh.onResults(results => {
      const lm = results.multiFaceLandmarks?.[0];
      if (!lm) return;
      const y = lm[1].y;
      if (lastYRef.current !== null) {
        const dy = lastYRef.current - y;
        if (dy > NOD_THRESHOLD) {
          nodCountRef.current += 1;
          setNods(nodCountRef.current);
          if (nodCountRef.current > WARNING_THRESHOLD) {
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 3000);
          }
        }
      }
      lastYRef.current = y;
    });

    const camera = new Camera(userVideoRef.current, {
      onFrame: async () => await faceMesh.send({ image: userVideoRef.current }),
      width: 640,
      height: 480
    });
    camera.start();

    return () => {
      camera.stop();
      faceMesh.close();
    };
  }, []);

  useEffect(() => {
    if (!timerRunning) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(t);
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [timerRunning]);

  const startSTT = () => {
    if (questionIndex >= questions.length) return;
    setFinalAnswerText("");
    setTimerRunning(true);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("브라우저가 음성 인식을 지원하지 않아요 😢");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => console.log("🎙️ 음성 인식 시작");
    recognition.onresult = event => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setFinalAnswerText(prev => prev + " " + transcript);
    };
    recognition.onerror = e => console.error("음성 인식 오류:", e.error);
    recognition.onend = () => console.log("🛑 음성 인식 중단");

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopSTT = () => recognitionRef.current?.stop();

  const updateAiImageByScore = score => {
    console.log("🎭 이미지 변경을 위한 점수:", score);
    if (score >= 80) setAiImage("80j.gif");
    else if (score >= 30) setAiImage("30j.gif");
    else setAiImage("20j.gif");
  };

  const handleSelfIntroEvaluation = async answer => {
    setSttLoading(true);
    try {
      console.log("📝 자기소개 평가 시작:", answer);
      const { totalScore, followUpQuestions } = await evaluateSelfIntroAPI(answer);
      console.log("📊 자기소개 총점:", totalScore);
      console.log("📌 후속 질문:", followUpQuestions);
      updateAiImageByScore(totalScore);

      const rawPhilosophy = await generateCompanyPhilosophyQuestionAPI();
      const philosophyQ = {
        text: rawPhilosophy?.question?.trim() ||
          "우리 회사의 철학이나 조직 문화를 어떻게 바라보시나요?",
        type: "philosophy"
      };

      let newQs = [questions[0]];
      if (totalScore < 60) {
        const jqs = await generateQuestionsAPI({ role, field, count: 4 });
        newQs = [...newQs, ...jqs.map(q => ({ text: q, type: role })), philosophyQ];
      } else if (followUpQuestions.length) {
        const jqs = await generateQuestionsAPI({ role, field, count: 2 });
        newQs = [
          ...newQs,
          ...followUpQuestions.map(q => ({ text: q, type: role })),
          ...jqs.map(q => ({ text: q, type: role })),
          philosophyQ
        ];
      } else {
        const jqs = await generateQuestionsAPI({ role, field, count: 4 });
        newQs = [...newQs, ...jqs.map(q => ({ text: q, type: role })), philosophyQ];
      }
      setQuestions(newQs);
      setQuestionIndex(1);
    } catch (e) {
      console.error("❌ 자기소개 평가 실패:", e);
    } finally {
      setSttLoading(false);
    }
  };

  const handleAnswerEvaluation = async answer => {
    if (!answer.trim()) return;
    setSttLoading(true);
    try {
      console.log(`📝 질문 ${questionIndex + 1}번 답변 평가 시작`);
      console.log("✅ 평가할 답변:", answer);
      const cq = questions[questionIndex];
      const roleToUse = cq.type === "philosophy" ? "philosophy" : role;
      const res = await evaluateAnswerAPI({ role: roleToUse, answerText: answer });
      const m = res.replace(/\n/g, " ").match(/총점:\s*(\d+)/);
      const score = m ? parseInt(m[1], 10) : 0;
      console.log(`📊 질문 ${questionIndex + 1}번 점수:`, score);
      updateAiImageByScore(score);
    } catch (e) {
      console.error("❌ 답변 평가 실패:", e);
    } finally {
      setSttLoading(false);
    }
  };

  const handleNextQuestion = async () => {
    stopSTT();
    setTimerRunning(false);
    setTimeLeft(90);

    if (questionIndex === 0) {
      await handleSelfIntroEvaluation(finalAnswerText);
    } else {
      await handleAnswerEvaluation(finalAnswerText);
      if (questionIndex >= questions.length - 1) {
        console.log("🎉 모든 질문 평가가 완료되었습니다!");
        setQuestionIndex(questions.length);
      } else {
        setQuestionIndex(q => q + 1);
      }
    }
    setFinalAnswerText("");
  };

  return (
    <div className="interview-room">
      {showWarning && <div className="nod-warning">⚠️ 주의: 과도한 끄덕임이 감지되었습니다.</div>}
      <div className="ai-section">
        <div className="avatar-wrapper">
          <img src={`/${aiImage}`} alt="AI 면접관" className="avatar-gif" />
        </div>
        <h3>AI 면접관</h3>
        <p className="question">
          {questionIndex < questions.length
            ? `질문 ${questionIndex + 1}. ${questions[questionIndex].text}`
            : "모든 질문이 완료되었습니다! 🎉"}
        </p>
      </div>

      <div className="user-section">
        <video
          ref={userVideoRef}
          autoPlay
          playsInline
          muted
          className="user-video"
        />
        <h3>지원자</h3>
      </div>
      
      <div
        className="timer-box"
        style={{ "--timer-progress": `${(timeLeft / 90) * 100}%` }}
      >
        <div className="timer-text1">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </div>
      </div>




    

      <div className="timer-circle">
        <svg className="progress-ring">
          <circle
            className="progress-ring__circle"
            stroke="white"
            strokeWidth="8"
            fill="transparent"
            r="54"
            cx="60"
            cy="60"
            style={{
              strokeDasharray: 339.292,
              strokeDashoffset: (1 - timeLeft / 90) * 339.292,
              transition: "stroke-dashoffset 1s linear",
            }}
          />
        </svg>
        <div className="timer-text">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </div>
        
        
      </div>
        

      




      <div className="stt-button-row">
        <button
          className="voice-button"
          onClick={startSTT}
          disabled={sttLoading || timerRunning || questionIndex >= questions.length}
        >
          {sttLoading ? "GPT 평가 중..." : "🎙️ 답변 시작"}
        </button>
        <button
          className="voice-button"
          onClick={handleNextQuestion}
          disabled={!timerRunning && questionIndex !== 0}
        >
          답변 완료
        </button>
      </div>
    </div>
  );
};

export default InterviewRoom;
