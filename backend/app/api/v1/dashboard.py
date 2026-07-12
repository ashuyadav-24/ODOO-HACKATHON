from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/summary")
async def get_dashboard_summary(
    current_user=Depends(get_current_user),
):
    return await DashboardService.get_summary()


@router.get("/recent-activities")
async def get_recent_activities(
    current_user=Depends(get_current_user),
):
    return await DashboardService.get_recent_activities()


@router.get("/asset-status")
async def get_asset_status(
    current_user=Depends(get_current_user),
):
    return await DashboardService.get_asset_status()


@router.get("/department-summary")
async def get_department_summary(
    current_user=Depends(get_current_user),
):
    return await DashboardService.get_department_summary()


@router.get("/category-summary")
async def get_category_summary(
    current_user=Depends(get_current_user),
):
    return await DashboardService.get_category_summary()