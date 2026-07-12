from fastapi import FastAPI

from app.api.router import api_router


app = FastAPI(
    title="AssetFlow API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.include_router(api_router)