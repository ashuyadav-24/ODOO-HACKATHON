from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import RoleChecker, get_current_user
from app.schemas.maintenance import (
    MaintenanceComplete,
    MaintenanceCreate,
    MaintenanceUpdate,
)
from app.services.maintenance_service import MaintenanceService

router = APIRouter(
    prefix="/maintenance",
    tags=["Maintenance"],
)

maintenance_manager = RoleChecker(
    ["admin", "asset_manager"]
)


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
)
async def create_maintenance(
    data: MaintenanceCreate,
    current_user=Depends(get_current_user),
    user=Depends(maintenance_manager),
):
    try:
        return await MaintenanceService.create(
            data,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("")
async def get_all_maintenance(
    current_user=Depends(get_current_user),
):
    return await MaintenanceService.get_all()


@router.get("/asset/{asset_id}")
async def get_asset_maintenance(
    asset_id: str,
    current_user=Depends(get_current_user),
):
    return await MaintenanceService.get_by_asset(
        asset_id
    )


@router.get("/status/{status_name}")
async def get_status_maintenance(
    status_name: str,
    current_user=Depends(get_current_user),
):
    return await MaintenanceService.get_by_status(
        status_name
    )


@router.get("/{maintenance_id}")
async def get_maintenance(
    maintenance_id: str,
    current_user=Depends(get_current_user),
):
    try:
        return await MaintenanceService.get_by_id(
            maintenance_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.put("/{maintenance_id}")
async def update_maintenance(
    maintenance_id: str,
    data: MaintenanceUpdate,
    current_user=Depends(get_current_user),
    user=Depends(maintenance_manager),
):
    try:
        return await MaintenanceService.update(
            maintenance_id,
            data,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.patch("/{maintenance_id}/complete")
async def complete_maintenance(
    maintenance_id: str,
    data: MaintenanceComplete,
    current_user=Depends(get_current_user),
    user=Depends(maintenance_manager),
):
    try:
        return await MaintenanceService.complete(
            maintenance_id,
            data.remarks,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.delete("/{maintenance_id}")
async def delete_maintenance(
    maintenance_id: str,
    current_user=Depends(get_current_user),
    user=Depends(maintenance_manager),
):
    try:
        return await MaintenanceService.delete(
            maintenance_id,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )