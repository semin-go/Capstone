# backend/service/gpt_handler.py

import os
from openai import OpenAI
from dotenv import load_dotenv

# Load .env
dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '.env'))
load_dotenv(dotenv_path)

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY가 .env에서 로드되지 않았습니다.")

client = OpenAI(api_key=api_key)


def ask_gpt(history: list, current_message: str, chat_style: str = "T") -> str:
    system_prompt = "논리적으로 대답해줘." if chat_style == "T" else "감성적으로 다정하게 대답해줘."

    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(history)
    messages.append({"role": "user", "content": current_message})

    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages
    )

    return response.choices[0].message.content

