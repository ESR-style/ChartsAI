from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_CONFIG = {
    "api_key": os.getenv("OPENAI_API_KEY"),
    "model": os.getenv("OPENAI_MODEL", "gpt-3.5-turbo"),
    "temperature": float(os.getenv("OPENAI_TEMPERATURE", "0.7")),
    "max_tokens": int(os.getenv("OPENAI_MAX_TOKENS", "150"))
}
