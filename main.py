from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import os

MODEL_ID = os.getenv("MISTRAL_REPO_ID", "mistral-model")
HF_TOKEN = os.getenv("HUGGINGFACE_HUB_TOKEN")

class Request(BaseModel):
    prompt: str

app = FastAPI()

# Load tokenizer and model at startup
tokenizer = AutoTokenizer.from_pretrained(
    MODEL_ID,
    trust_remote_code=True,
    use_auth_token=HF_TOKEN
)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    load_in_4bit=True,
    device_map="auto",
    trust_remote_code=True,
    use_auth_token=HF_TOKEN
)

@app.post("/generate")
async def generate(req: Request):
    inputs = tokenizer(req.prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(**inputs)
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": text}