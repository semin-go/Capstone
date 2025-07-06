from fastapi import APIRouter, Request, Depends
from model.user import UserSignup, UserLogin
from service.auth_handler import signup_user, login_user
from service.auth_utils import decode_token

router = APIRouter()

@router.post("/signup")
async def signup(user: UserSignup):
    return await signup_user(user)

@router.post("/login")
async def login(user: UserLogin):
    return await login_user(user)

@router.get("/me")
def get_me(request: Request):
    auth = request.headers.get("Authorization")
    if not auth:
        return {"error": "토큰이 없습니다."}
    token = auth.split(" ")[1]
    payload = decode_token(token)
    if payload is None:
        return {"error": "유효하지 않은 토큰입니다."}
    return {"email": payload["email"]}
