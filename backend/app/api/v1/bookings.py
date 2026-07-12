from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import (
    RoleChecker,
    get_current_user,
)
from app.schemas.booking import (
    BookingApproval,
    BookingCreate,
    BookingUpdate,
)
from app.services.booking_service import BookingService

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"],
)

asset_manager = RoleChecker(
    ["admin", "asset_manager"]
)


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
)
async def create_booking(
    data: BookingCreate,
    current_user=Depends(get_current_user),
):
    try:
        return await BookingService.create(
            data,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("")
async def get_all_bookings(
    current_user=Depends(get_current_user),
):
    return await BookingService.get_all()


@router.get("/pending")
async def get_pending_bookings(
    current_user=Depends(get_current_user),
    user=Depends(asset_manager),
):
    return await BookingService.get_pending()


@router.get("/user/{user_id}")
async def get_user_bookings(
    user_id: str,
    current_user=Depends(get_current_user),
):
    return await BookingService.get_by_user(
        user_id
    )


@router.get("/asset/{asset_id}")
async def get_asset_bookings(
    asset_id: str,
    current_user=Depends(get_current_user),
):
    return await BookingService.get_by_asset(
        asset_id
    )


@router.get("/{booking_id}")
async def get_booking(
    booking_id: str,
    current_user=Depends(get_current_user),
):
    try:
        return await BookingService.get_by_id(
            booking_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.put("/{booking_id}")
async def update_booking(
    booking_id: str,
    data: BookingUpdate,
    current_user=Depends(get_current_user),
):
    try:
        return await BookingService.update(
            booking_id,
            data,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.patch("/{booking_id}/approve")
async def approve_booking(
    booking_id: str,
    current_user=Depends(get_current_user),
    user=Depends(asset_manager),
):
    try:
        return await BookingService.approve(
            booking_id,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.patch("/{booking_id}/reject")
async def reject_booking(
    booking_id: str,
    data: BookingApproval,
    current_user=Depends(get_current_user),
    user=Depends(asset_manager),
):
    try:
        return await BookingService.reject(
            booking_id,
            data.rejection_reason,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.delete("/{booking_id}")
async def delete_booking(
    booking_id: str,
    current_user=Depends(get_current_user),
    user=Depends(asset_manager),
):
    try:
        return await BookingService.delete(
            booking_id,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )