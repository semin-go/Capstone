from model.user import UserSignup, UserLogin
from fastapi import HTTPException
from db.firebase import db
from service.auth_utils import (
    encrypt_email, hash_password, verify_password, create_access_token
)

async def signup_user(user: UserSignup):
    # 평문 이메일로 중복 확인
    existing_users = db.collection("users").where("email", "==", user.email).stream()
    if any(existing_users):
        raise HTTPException(status_code=400, detail="이미 등록된 이메일입니다.")

    hashed_pw = hash_password(user.password)
    enc_email = encrypt_email(user.email)

    db.collection("users").add({
        "email": user.email,                #  평문 저장 (검색용)
        "encrypted_email": enc_email,       #  별도 저장 (보안 목적)
        "password": hashed_pw,
        "gender": user.gender,
        "chat_style": user.chat_style
    })
    return {"message": "회원가입 완료"}


async def login_user(user: UserLogin):
    # 평문 이메일로 검색
    users = db.collection("users").where("email", "==", user.email).stream()
    user_doc = next(users, None)
    if not user_doc:
        raise HTTPException(status_code=400, detail="존재하지 않는 사용자입니다.")

    data = user_doc.to_dict()
    if not verify_password(user.password, data["password"]):
        raise HTTPException(status_code=400, detail="비밀번호가 일치하지 않습니다.")

    enc_email = encrypt_email(user.email)
    token = create_access_token({"email": user.email})
    return {"access_token": token}
