# 🎓 2025 Capstone Design
2025 Capstone design
AI 기반 영상 콘텐츠 검열 시스템 개발 프로젝트

---

## 🧩 주요 기능
- 🎯 실시간 영상 속 객체(인물, 특정 장면 등) 탐지 및 블러 처리  
- 😊 얼굴/표정 인식 기반 감정 분석  
- 🗣️ 음성 자막의 자연어 분석 및 검열  
- ⚙️ 사용자 맞춤 검열 옵션 제공 (객체 유형, 감정 유형 등)  
- 🌐 웹 기반 API로 영상 분석 결과 제공  

---
## 🧑‍🤝‍🧑멤버
| 이름 | 이메일 |
|------|--------|
| 신보규 | tisqhrb123@naver.com |
| 정우진 | woojin000612@naver.com |
| 고세민 | rhtpals13@naver.com |
| EGAMOV GIYOS GOFUR UGLI | ghiyeoz@gmail.com |

---
## 설치 및 실행방법


## 📦 의존성
torch==1.13.1
torchvision==0.14.1
ultralytics==8.0.153
opencv-python==4.7.0.72
ffmpeg-python==0.2.0
mediapipe==0.10.9
deepface==0.0.79
dlib==19.24.0
transformers==4.35.2
nltk==3.8.1
flask==2.3.3
fastapi==0.110.0
pymongo==4.6.1
psycopg2==2.9.9
numpy==1.24.4
pandas==1.5.3
matplotlib==3.7.1
seaborn==0.12.2


## 개발기간
2025.03.10~

## 개발환경

| 항목 | 내용 |
|------|------|
| **OS** | Windows 11 / Ubuntu 22.04 |
| **Python 버전** | 3.10.x |
| **CUDA 버전** | 11.7 (GPU 가속 시) |
| **IDE** | VS Code / PyCharm |
| **가상환경** | `venv` 또는 `conda` 권장 |


## 🧰 기술 스택 상세

### 🎯 객체 탐지 및 딥러닝

| 기술 | 버전 | 역할 및 설명 |
|------|------|---------------|
| **YOLOv8n (Ultralytics)** | 8.0.153 | 실시간 객체 탐지. 경량화된 YOLOv8으로 빠른 추론 속도 제공 |
| **PyTorch** | 1.13.1 | YOLOv8n 실행 및 모델 커스터마이징 |
| **TensorFlow** | 2.11.0 | 감정 분석 및 분류 모델용 |
| **Keras** | 2.11.0 | TensorFlow 기반 고수준 API |
| **Transformers** | 4.35.2 | 음성 자막의 텍스트 분류, 감성 분석 등에 사용 |
| **NLTK** | 3.8.1 | 텍스트 정제 및 단어 빈도 분석 등 NLP 처리 |

---

### 🎥 영상/오디오 분석 및 전처리

| 기술 | 버전 | 역할 |
|------|------|------|
| **OpenCV** | 4.7.0 | 영상 프레임 처리, 이미지 블러 처리 |
| **FFmpeg** | 5.1.2 | 영상 자르기, 오디오 추출, 블러 삽입 등 |
| **MediaPipe** | 0.10.9 | 얼굴, 손, 포즈 등 실시간 감지 (Light-weight CV) |

---

### 🌐 웹 백엔드 및 API

| 기술 | 버전 | 설명 |
|------|------|------|
| **FastAPI** | 0.110.0 | 고성능 비동기 API 서버 구축 |
| **Flask** | 2.3.3 | 간단한 테스트용 서버 구축에도 활용 가능 |

---

### 🗃 데이터베이스

| 기술 | 버전 | 설명 |
|------|------|------|
| **MongoDB (pymongo)** | 4.6.1 | JSON 기반 비정형 데이터 저장 (검열 결과 등) |
| **PostgreSQL (psycopg2)** | 2.9.9 | 정형 데이터 저장 (사용자, 로그, 메타 정보 등) |

---

### 🛠 기타 주요 라이브러리

| 기술 | 설명 |
|------|------|
| **NumPy / Pandas** | 데이터 조작 및 통계 처리 |
| **Matplotlib / Seaborn** | 시각화 및 리포트용 그래프 |

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
