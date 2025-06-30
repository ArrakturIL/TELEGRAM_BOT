FROM python:3.10-slim
RUN pip install --no-cache-dir transformers accelerate bitsandbytes fastapi uvicorn[standard]
WORKDIR /app
COPY . /app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]