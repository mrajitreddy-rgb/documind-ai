from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.upload import router as upload_router

app = FastAPI(
    title="DocuMind AI API",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to DocuMind AI Backend"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

app.include_router(
    upload_router,
    prefix="/api",
    tags=["Upload"]
)