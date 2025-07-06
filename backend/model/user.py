# models/user.py
from pydantic import BaseModel, EmailStr

class UserSignup(BaseModel):
    email: EmailStr
    password: str
    gender: str          
    chat_style: str 

class UserLogin(BaseModel):
    email: EmailStr
    password: str
