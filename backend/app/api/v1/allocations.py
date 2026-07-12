from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import RoleChecker, get_current_user
from app.schemas.allocation import (
    AllocationCreate,
    AllocationReturn,
    AllocationUpdate,
)
from app.services.allocation_service import AllocationService

router = APIRouter(
    prefix="/allocations",
    tags=["Allocations"],
)

asset_manager = RoleChecker(["admin", "asset_manager"])


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
)
async def create_allocation(
    data: AllocationCreate,
    current_user=Depends(get_current_user),
    user=Depends(asset_manager),
):
    try:
        return await AllocationService.create(
            data,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("")
async def get_allocations(
    current_user=Depends(get_current_user),
):
    return await AllocationService.get_all()


@router.get("/user/{user_id}")
async def get_user_allocations(
    user_id: str,
    current_user=Depends(get_current_user),
):
    return await AllocationService.get_by_user(
        user_id
    )


@router.get("/asset/{asset_id}")
async def get_asset_allocations(
    asset_id: str,
    current_user=Depends(get_current_user),
):
    return await AllocationService.get_by_asset(
        asset_id
    )


@router.get("/{allocation_id}")
async def get_allocation(
    allocation_id: str,
    current_user=Depends(get_current_user),
):
    try:
        return await AllocationService.get_by_id(
            allocation_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.put("/{allocation_id}")
async def update_allocation(
    allocation_id: str,
    data: AllocationUpdate,
    current_user=Depends(get_current_user),
    user=Depends(asset_manager),
):
    try:
        return await AllocationService.update(
            allocation_id,
            data,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.put("/{allocation_id}/return")
async def return_asset(
    allocation_id: str,
    data: AllocationReturn,
    current_user=Depends(get_current_user),
    user=Depends(asset_manager),
):
    try:
        return await AllocationService.return_asset(
            allocation_id,
            data.remarks,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.delete("/{allocation_id}")
async def delete_allocation(
    allocation_id: str,
    current_user=Depends(get_current_user),
    user=Depends(asset_manager),
):
    try:
        return await AllocationService.delete(
            allocation_id,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )