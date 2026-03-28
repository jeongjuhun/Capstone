import React, { useState, useRef } from 'react';
import './components/VoiceToText.css';

const VoiceToText = ({ onEvaluationComplete }) => {
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('브라우저가 음성 인식을 지원하지 않아요 😢');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const isFinal = event.results[event.results.length - 1].isFinal;
      const result = event.results[event.results.length - 1][0].transcript;

      setTranscript(result);

      // 최종 결과일 때만 GPT 평가 요청
      if (isFinal) {
        evaluateAnswerWithGPT(result);
      }
    };

    recognition.onerror = (event) => {
      console.error('음성 인식 오류:', event.error);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const evaluateAnswerWithGPT = async (answerText) => {
    const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    console.log("OPENAI_API_KEY:", OPENAI_API_KEY);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: '너는 IT 면접관이야. 응답을 듣고 100점 만점으로 점수를 주고, 그 이유를 간단히 설명해줘.',
            },
            {
              role: 'user',
              content: `질문에 대한 응답: ${answerText}`,
            },
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const gptReply = data.choices[0].message.content;

      console.log('🧠 GPT 응답:', gptReply);

      const scoreMatch = gptReply.match(/([0-9]{1,3})점/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : null;

      if (onEvaluationComplete && score !== null) {
        onEvaluationComplete({
          score,
          feedback: gptReply,
          answer: answerText,
        });
      }
    } catch (error) {
      console.error('GPT 평가 요청 실패:', error);
    }
  };

  return (
    <div className="voice-container">
      <h2 className="voice-title">음성 → 텍스트 변환</h2>
      <button className="voice-button" onClick={startRecognition}>🎙️ 시작</button>
      <button className="voice-button" onClick={stopRecognition}>⏹️ 종료</button>
      <p className="voice-text">📝 결과: {transcript}</p>
    </div>
  );
};

export default VoiceToText;
