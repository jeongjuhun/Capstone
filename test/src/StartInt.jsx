import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./components/StartInt.css";

function StartInt() {
  const [micTested, setMicTested] = useState(false);
  const [cameraTested, setCameraTested] = useState(false);
  const [showStartMessage, setShowStartMessage] = useState(false);
  const [micLevel, setMicLevel] = useState(0);
  const [stream, setStream] = useState(null);

  const videoRef = useRef(null);
  const audioContextRef = useRef(null);
  const navigate = useNavigate();
  const selectedField = localStorage.getItem("selectedField") || "기본";

  // 마이크 테스트
  const handleMicTest = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        setMicTested(true);
        alert("마이크가 정상적으로 작동합니다.");

        // 마이크 레벨 시각화
        audioContextRef.current = new AudioContext();
        const analyser = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setMicLevel(average);
          requestAnimationFrame(draw);
        };
        draw();
      })
      .catch(() => alert("마이크를 사용할 수 없습니다."));
  };

  // 카메라 테스트
  const handleCameraTest = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        setCameraTested(true);
        setStream(stream);
        alert("카메라가 정상적으로 작동합니다.");
      })
      .catch((err) => {
        console.error("카메라 접근 오류:", err);
        alert("카메라를 사용할 수 없습니다. 브라우저 권한을 확인해주세요.");
      });
  };

  // stream이 생기면 video에 연결
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((err) =>
        console.error("비디오 자동 재생 오류:", err)
      );
    }
  }, [stream]);

  // 마이크 & 카메라 테스트 완료 시 자동 이동
  useEffect(() => {
    if (micTested && cameraTested) {
      setShowStartMessage(true);
      const timer = setTimeout(() => {
        navigate("/interviewroom");
      }, 6000); // 6초 후 이동
      return () => clearTimeout(timer);
    }
  }, [micTested, cameraTested, navigate]);

  // 언마운트 시 스트림 정리
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="start-container">
      <div className="test-box">
        <h2>면접 준비 단계</h2>

        {/* 마이크 테스트 */}
        {!micTested && (
          <div>
            <button
              onClick={handleMicTest}
              style={{ backgroundColor: "#1e90ff", marginBottom: "10px" }}
            >
              🎤 마이크 테스트
            </button>

            {/* 마이크 레벨 바 */}
            <div style={{
              height: "10px",
              width: "100%",
              background: "#333",
              borderRadius: "5px",
              overflow: "hidden",
              marginTop: "10px"
            }}>
              <div style={{
                height: "100%",
                width: `${micLevel}%`,
                backgroundColor: "#2ecc71",
                transition: "width 0.1s ease"
              }} />
            </div>
          </div>
        )}

        {/* 카메라 테스트 */}
        {micTested && !cameraTested && (
          <div>
            <button
              onClick={handleCameraTest}
              style={{ backgroundColor: "#1e90ff", marginBottom: "10px" }}
            >
              📷 카메라 테스트
            </button>
          </div>
        )}

        {/* 카메라 미리보기 */}
        {cameraTested && (
          <div>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              width="300"
              height="200"
              style={{
                marginTop: "10px",
                borderRadius: "8px",
                backgroundColor: "#000",
                objectFit:"cover",
                aspectRatio: "3/2",
              }}
            />
          </div>
        )}

        {/* 면접 시작 메시지 */}
        {showStartMessage && (
          <div style={{ marginTop: "30px", fontSize: "20px", color: "#1e90ff" }}>
            ✅ 면접 시작!
          </div>
        )}
      </div>
    </div>
  );
}

export default StartInt;


