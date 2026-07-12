from fastapi import APIRouter

api_router = APIRouter()


@api_router.get("/")
async def root():
    return {
        "message": "AssetFlow Backend Running"
    }


@api_router.get("/health")
async def health():
    return {
        "status": "healthy"
    }