from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import RoleChecker, get_current_user
from app.schemas.user import UserRoleUpdate, UserUpdate
from app.services.user_service import UserService

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

admin_only = RoleChecker(["admin"])


@router.get("/me")
async def get_me(
    current_user=Depends(get_current_user),
):
    current_user["id"] = str(current_user["_id"])
    del current_user["_id"]
    current_user.pop("hashed_password", None)

    return current_user


@router.get("")
async def get_all_users(
    user=Depends(admin_only),
):
    return await UserService.get_all_users()


@router.get("/{user_id}")
async def get_user(
    user_id: str,
    user=Depends(admin_only),
):
    try:
        return await UserService.get_user_by_id(user_id)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.put("/{user_id}")
async def update_user(
    user_id: str,
    data: UserUpdate,
    user=Depends(admin_only),
):
    try:
        return await UserService.update_user(
            user_id,
            data,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.patch("/{user_id}/role")
async def update_role(
    user_id: str,
    data: UserRoleUpdate,
    user=Depends(admin_only),
):
    try:
        return await UserService.update_role(
            user_id,
            data.role,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.patch("/{user_id}/activate")
async def activate_user(
    user_id: str,
    user=Depends(admin_only),
):
    try:
        return await UserService.activate_user(user_id)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.patch("/{user_id}/deactivate")
async def deactivate_user(
    user_id: str,
    user=Depends(admin_only),
):
    try:
        return await UserService.deactivate_user(user_id)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )