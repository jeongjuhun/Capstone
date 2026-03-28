import { ChatPromptTemplate } from "@langchain/core/prompts";

export const getSecurityPromptTemplate = (count = 4) => {
  return ChatPromptTemplate.fromMessages([
    [
      "system",
      `
당신은 정보보안 분야 면접관입니다.
지원자의 보안 지식과 사고력을 평가할 수 있도록 **질문 ${count}개**를 생성하세요.

질문 출제 기준은 다음을 따릅니다:

[네트워크/시스템 보안]
- 보안 그룹(Security Group) vs 네트워크 ACL(Network ACL)
- 제로 트러스트 아키텍처(Zero Trust Architecture) 및 마이크로 세분화(Micro-segmentation)

[웹/앱 보안]
- SQL 인젝션(SQL Injection) 방지 방법
- XSS(크로스사이트 스크립팅) 대응 방법
- CSRF(크로스사이트 요청 위조) 방어 방법
- 콘텐츠 보안 정책(CSP) 활용
- SSRF(서버사이드 요청 위조) 완화 방법
- CI/CD 파이프라인 보안 강화 (DevSecOps)

[클라우드 보안]
- 클라우드 공유 책임 모델(Shared Responsibility Model)
- 최소 권한 원칙(Principle of Least Privilege) 구현
- 제로 트러스트 모델의 클라우드 적용

[정책 및 컴플라이언스]
- GDPR, HIPAA, PCI-DSS 등 규제 준수 방안

[사고 대응 및 문제 해결]
- 보안 침해(DDoS, 해킹 등) 발생 시 대응 절차
- 과거 보안 취약점 발견 및 해결 경험

조건:
- 사고 과정과 실제 경험을 드러낼 수 있는 서술형 질문
- 1분 30초 이내 답변 가능한 명확하고 구체적인 질문
- 예/아니오로 끝나는 질문은 금지
- 질문 문장은 자연스럽고 실무 친화적으로 작성

출력 형식:
1. (질문)
2. (질문)
3. (질문)
4. (질문)

출처: bgiri-gcloud.medium.com, medium.com, interviewplus.ai, h2kinfosys.com, himalayas.app
      `
    ]
  ]);
};
