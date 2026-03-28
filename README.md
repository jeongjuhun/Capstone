# 2025-1_Team.Woo-hwang-cheongsim-won
2025년 1학기 캡스톤디자인(AI 면접 시뮬레이션/김태현, 정주훈, 임윤섭)


<h2>💻 개발 환경</h2>

<table>
  <thead>
    <tr>
      <th style="text-align:center;">구분</th>
      <th style="text-align:center;">기술</th>
      <th style="text-align:center;">버전</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><strong>프론트엔드</strong></td>
      <td align="center">React</td>
      <td align="center">18.2.0</td>
    </tr>
    <tr>
      <td align="center"><strong>STT 인식</strong></td>
      <td align="center">Web Speech API</td>
      <td align="center">최신 브라우저 기반</td>
    </tr>
    <tr>
      <td align="center"><strong>AI 평가엔진</strong></td>
      <td align="center">OpenAI GPT-4 API</td>
      <td align="center">2024-06 기준</td>
    </tr>
    <tr>
      <td align="center"><strong>프롬프트 구성</strong></td>
      <td align="center">LangChain (Node.js 기반)</td>
      <td align="center">0.1 이상</td>
    </tr>
    <tr>
      <td align="center"><strong>비전 분석</strong></td>
      <td align="center">MediaPipe FaceMesh</td>
      <td align="center">최신</td>
    </tr>
    <tr>
      <td align="center"><strong>배포환경</strong></td>
      <td align="center">Cloudtype (BE)</td>
      <td align="center">-</td>
    </tr>
    <tr>
      <td align="center"><strong>버전관리</strong></td>
      <td align="center">Git, GitHub</td>
      <td align="center">-</td>
    </tr>
  </tbody>
</table>

## 📖 프로젝트 설명

🎤사용자의 자기소개 및 면접 답변을 AI가 실시간으로 평가해주는 **웹 기반 면접 시뮬레이터**입니다.  
GPT-4, LangChain, Web Speech API, MediaPipe 등 최신 기술을 활용하여 **몰입형 AI 인터뷰 환경**을 제공합니다.

- 사용자의 음성을 인식하여 자동으로 텍스트로 변환 (STT)
- 자기소개 답변을 바탕으로 **GPT-4가 질문 생성 및 평가**
- 고개 끄덕임 감지
- 면접관 이미지가 **점수에 따라 동적으로 변화**

## 🧩 시스템 구성도

AI 면접 시뮬레이션 시스템의 흐름과 평가 로직 구성도입니다:
![AI 면접 시뮬레이션 시스템 구성도](./구성도.png)

<h2>🌐 배포 주소</h2>

<ul>
  <li>🔵 <strong>프론트엔드</strong>: <a href="https://web-capstone-ai-react-mb65c377c98e4ee4.sel4.cloudtype.app/" target="_blank">InterviewMate 웹사이트 바로가기</a></li>
  <li>🟢 <strong>백엔드 API</strong>: <a href="https://port-0-capstone-ai-mb65c377c98e4ee4.sel4.cloudtype.app/" target="_blank">API 서버 엔드포인트</a></li>
</ul>



### 👨‍💻 프로젝트 기여자
<table>
<thead>
<tr>
<th align="center"><strong>임윤섭</strong></th>
<th align="center"><strong>정주훈</strong></th>
<th align="center"><strong>김태현</strong></th>

</tr>
</thead>
<tbody>
<tr>
<td align="center"><a href="https://github.com/qwer-121212"><img src="https://github.com/qwer-121212.png" height="150" width="150"> <br> 프론트엔드 </td>
<td align="center"><a href="https://github.com/jeongjuhun"><img src="https://github.com/jeongjuhun.png" height="150" width="150"> <br> 백엔드 </td>
<td align="center"><a href="https://github.com/bird8696"><img src="https://github.com/bird8696.png" height="150" width="150"> <br> AI 구성 </a></td>
</tr>
</tbody>
</table>
<br>
