import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

#  .env 로드
load_dotenv()

# 환경변수 값만 가져오기
cred_path = os.getenv("FIREBASE_KEY_PATH")

if not cred_path:
    raise ValueError("FIREBASE_KEY_PATH 환경변수가 설정되지 않았습니다.")

print("🔥 FIREBASE KEY PATH:", cred_path)  

# 인증 정보 로드
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

#  Firestore 객체
db = firestore.client()
