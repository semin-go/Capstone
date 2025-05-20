# 🎓 2025 Capstone Design
# 💌 마음톡 (MaumTalk)
AI 기반 연애 상담 서비스

## 📘 프로젝트 개요

**마음톡**은 연애 고민을 가진 사용자를 위해 AI 기술을 활용하여  
상황에 맞는 **상담**, **대화 추천**, **감정 분석**, **톡 첨삭** 등  
개인화된 연애 조언을 제공하는 서비스입니다.

- 24시간 AI 연애 상담사
- 카카오톡 대화 기반 감정 및 패턴 분석
- MBTI 기반 연애 성향 진단
- 실시간 호감도 및 감정 변화 추적

---

## 개발 기간
2025.04.15~2025.00.00

---

## 💡 핵심 기능

### 💬 카톡 대화 분석
- 사용자와 상대방의 **카카오톡 대화 내용 분석**
- 감정 흐름, 말투, 텐션 변화 인식
- **썸 가능성 판단**, 대화 추천, 톡 첨삭

### 🧠 AI 연애 상담
- **GPT API**를 활용한 실시간 연애 상담
- 고민에 따른 **맞춤형 해결책 제안**
- 상담 히스토리 저장 및 **개인화 피드백**

### 💗 MBTI 기반 연애 성향 분석
- 사용자의 MBTI를 기반으로 성격 유형 해석
- **상호작용 예측**, 궁합 분석, 연애 전략 추천

### 📊 감정 분석 및 시각화
- 대화의 감정 상태 추적
- 텍스트 감정 분석 도구(TextBlob 등) 활용
- **두근지수** 및 관계 진전 가능성 수치화

### 🧠 시나리오 대응 및 행동 추천
- 특정 상황(싸움, 고백 등)에 따른 행동 제안
- 결과 예측을 통한 전략적 대화 유도

---

## 🛠 기술 아키텍처

### 🧠 AI 및 자연어 처리

| 기술 | 설명 |
|------|------|
| **OpenAI GPT API** | 실시간 연애 고민 응답 생성, 맥락 이해 |
| **Transformers (BERT)** | 사용자 대화의 문맥 기반 분석 |
| **TextBlob** | 감정 상태 분석 및 점수화 |
| **Custom Prompt Logic** | 시나리오 기반 행동 전략 추천 |


### 🔐 인증 및 보안

| 기술 | 설명 |
|------|------|
| **Firebase Auth** | 사용자 인증 처리 (이메일/비밀번호 기반) |
| **JWT (PyJWT)** | 토큰 발급 및 사용자 구분 |
| **bcrypt** | 비식별화된 상담 데이터 암호화 |

### 💾 데이터베이스

| 기술 | 역할 |
|------|------|
| **Firebase Realtime DB / Firestore** | 상담 히스토리, 감정 변화 기록 저장 |


### 🌐 프론트엔드 및 통신

| 기술 | 설명 |
|------|------|
| **React.js** | 사용자 인터페이스 구현 |
| **React Query** | 비동기 데이터 핸들링 |
| **Firebase Cloud Messaging** | 실시간 알림 전송 |
| **FastAPI** | 백엔드 서버 및 API 통신 |

---

##폴더 구조
```
maeumtalk/
├── backend/
│   ├── app/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
├── .env
└── README.md
```
---

## 📦 설치 및 실행 방법
# 1. 가상 환경 생성 및 활성화
python -m venv venv
source venv/bin/activate   
# Windows: venv\Scripts\activate

# 2. 필수 라이브러리 설치
pip install -r requirements.txt

# 3. FastAPI 서버 실행
uvicorn main:app --reload

# 4. React 프론트엔드 실행
cd frontend
npm install
npm run dev
---
## 라이선스

    MIT License

    Copyright (c) 2024 LimJeongYeop

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
