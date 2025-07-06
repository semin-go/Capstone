from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
import jwt
import os
from dotenv import load_dotenv
from fastapi import Request, HTTPException, Depends
from cryptography.fernet import Fernet
import pytesseract
# 환경 변수 로드
load_dotenv()

#  환경 변수
SECRET_KEY = os.getenv("SECRET_KEY", "secret")
FERNET_KEY = os.getenv("FERNET_KEY").encode()
ALGORITHM = "HS256"
# @@@@@@@@@@@@@@@@주소 수정 해야함
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
#  Fernet 인스턴스
fernet = Fernet(FERNET_KEY)

#  비밀번호 해싱
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

#  이메일 비식별화
def encrypt_email(email: str) -> str:
    return fernet.encrypt(email.encode()).decode()

def decrypt_email(enc_email: str) -> str:
    return fernet.decrypt(enc_email.encode()).decode()

#  JWT 발급
def create_access_token(data: dict, expires_minutes: int = 60):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

#  JWT 해독
def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def verify_jwt(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="인증 토큰이 필요합니다.")

    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if payload is None:
        raise HTTPException(status_code=403, detail="유효하지 않은 토큰입니다.")
    
    return payload