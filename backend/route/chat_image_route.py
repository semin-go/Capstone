# route/chat_image_route.py

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.security import HTTPBearer
from service.auth_utils import verify_jwt
from service.ocr_utils import extract_text_from_image
import shutil
import os
from uuid import uuid4

router = APIRouter()
security = HTTPBearer()

UPLOAD_DIR = "uploaded_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/chat/upload-image", dependencies=[Depends(security)])
async def upload_image(
    file: UploadFile = File(...),
    token: dict = Depends(verify_jwt)
):
    try:
        # 저장 경로 지정
        filename = f"{uuid4().hex}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)

        # 이미지 저장
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # OCR 처리
        extracted_text = extract_text_from_image(file_path)

        return {"text": extracted_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"이미지 처리 중 오류 발생: {str(e)}")
