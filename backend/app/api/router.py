from fastapi import APIRouter

from app.api.v1.auth import router as auth_router

api_router = APIRouter()


@api_router.get("/")
async def root():
    return {"message": "AssetFlow Backend Running"}


@api_router.get("/health")
async def health():
    return {"status": "healthy"}


api_router.include_router(auth_router)