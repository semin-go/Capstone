from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from datetime import datetime
from google.cloud.firestore_v1 import ArrayUnion
from db.firebase import db
from service.auth_utils import verify_jwt, encrypt_email
from service.gpt_handler import ask_gpt
import traceback 

router = APIRouter()
security = HTTPBearer()

class ChatRequest(BaseModel):
    message: str

@router.post("", dependencies=[Depends(security)])
async def chat(body: ChatRequest, token: dict = Depends(verify_jwt)):
    try:
        if not body.message.strip():
            raise HTTPException(status_code=400, detail="메시지를 입력하세요.")

        user_email = token.get("email")
        if not user_email:
            raise HTTPException(status_code=400, detail="JWT에 이메일이 없습니다.")
        print(f"✅ 사용자 이메일: '{user_email}'")

        encrypted_email = encrypt_email(user_email)

        # 사용자 문서 조회
        user_docs = db.collection("users").where("email", "==", user_email).stream()
        user_doc = next(user_docs, None)

        if not user_doc:
            raise HTTPException(status_code=404, detail="사용자 정보를 찾을 수 없습니다.")

        user_data = user_doc.to_dict()
        chat_style = user_data.get("chat_style", "T")

        # 최근 10개 대화 불러오기
        docs = db.collection("chats") \
            .where("user_email", "==", user_email) \
            .order_by("timestamp", direction="DESCENDING") \
            .limit(10).stream()

        docs_list = list(docs)
        print(f"📦 불러온 대화 수: {len(docs_list)}")
        chat_history = []

        for doc in reversed(docs_list):  
            d = doc.to_dict()
            # 디버깅 코드
            print(" user:", d.get("user_email"))
            print(" message:", d.get("message"))
            print(" response:", d.get("response"))
            chat_history.append({"role": "user", "content": d["message"]})
            chat_history.append({"role": "assistant", "content": d["response"]})

        # GPT 호출
        response = ask_gpt(chat_history, body.message, chat_style)

        # Firestore에 채팅 저장
        db.collection("chats").add({
            "user_email": user_email,
            "encrypted_email": encrypted_email,
            "chat_style": chat_style,
            "message": body.message,
            "response": response,
            "timestamp": datetime.now()
        })

        return {"response": response}

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"GPT 처리 중 오류 발생: {str(e)}")
# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@request.json 실제 앱에서 사용할 코드드
# router = APIRouter(prefix="/chat")
# @router.post("")
# async def chat(request: Request, token: dict = Depends(verify_jwt)):
#     try:
#         body = await request.json()
#         message = body.get("message", "")
#         if not message:
#             raise HTTPException(status_code=400, detail="메시지를 입력하세요.")
        
#         response = ask_gpt(message)
#         return {"response": response}
    
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"GPT 처리 중 오류 발생: {str(e)}")


