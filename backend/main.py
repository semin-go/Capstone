from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from route.chat_route import router as chat_router
from route.auth_route import router as auth_router
from service.gpt_handler import ask_gpt
from service.auth_utils import verify_jwt
from fastapi.openapi.utils import get_openapi
from route.chat_image_route import router as chat_image_router

app = FastAPI()

#  CORS 설정 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 요청 바디 구조 정의
class MessageRequest(BaseModel):
    message: str



def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="마음톡 API",
        version="1.0.0",
        description="JWT 인증 기반 AI 상담 서비스",
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }

    for path in openapi_schema["paths"].values():
        for operation in path.values():
            operation.setdefault("security", []).append({"bearerAuth": []})

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.include_router(chat_router, prefix="/chat")
app.include_router(auth_router, prefix="/auth")
app.include_router(chat_image_router)
app.openapi = custom_openapi