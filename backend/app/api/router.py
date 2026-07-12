from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.departments import router as department_router
from app.api.v1.categories import router as categories_router
from app.api.v1.assets import router as assets_router
from app.api.v1.allocations import router as allocations_router
from app.api.v1.maintenance import router as maintenance_router
from app.api.v1.audits import router as audits_router

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


api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(department_router)
api_router.include_router(categories_router)
api_router.include_router(assets_router)
api_router.include_router(allocations_router)
api_router.include_router(maintenance_router)
api_router.include_router(audits_router)