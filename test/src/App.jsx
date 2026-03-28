import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import MyPage from "./MyPage";
import StartInt from "./StartInt";
import InterviewRoom from "./InterviewRoom";
import VoiceToText from "./VoiceToText";
import SelectField from "./SelectField";
import AboutPage from "./AboutPage";
import QnaPage from "./QnaPage";





import { AuthProvider } from "./AuthContext"; // AuthProvider 추가

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutpage" element={<AboutPage />}/>
          <Route path="/qnapage" element={<QnaPage />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} /> 
          <Route path="/startint" element={<StartInt/>}/>
          <Route path="/interviewroom" element={<InterviewRoom />} />
          <Route path="/voicetotext" element={<VoiceToText />} />
          <Route path="/selectfield" element={<SelectField />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
