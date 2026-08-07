from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.upload import router as upload_router
from app.routes.export import router as export_router
from app.database import Base, engine
from app.models import Upload, Invoice, Payment
from app.routes.history import router as history_router
from app.routes.payments import router as payments_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DocuMind AI API",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",
    "https://documind-ai-one-flame.vercel.app",
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


# Upload API
app.include_router(
    upload_router,
    prefix="/api",
    tags=["Upload"]
)
app.include_router(payments_router)

# Export API
app.include_router(
    export_router,
    prefix="/api/export",
    tags=["Export"]
)

app.include_router(
    history_router,
    prefix="/api",
    tags=["History"]
)