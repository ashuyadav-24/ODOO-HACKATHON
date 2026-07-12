from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import (
    RoleChecker,
    get_current_user,
)
from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
)
from app.services.department_service import DepartmentService

router = APIRouter(
    prefix="/departments",
    tags=["Departments"],
)

admin_only = RoleChecker(["admin"])


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
)
async def create_department(
    data: DepartmentCreate,
    current_user=Depends(get_current_user),
    user=Depends(admin_only),
):
    try:
        return await DepartmentService.create(
            data,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("")
async def get_departments():

    return await DepartmentService.get_all()


@router.get("/{department_id}")
async def get_department(
    department_id: str,
):
    try:
        return await DepartmentService.get_by_id(
            department_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.put("/{department_id}")
async def update_department(
    department_id: str,
    data: DepartmentUpdate,
    current_user=Depends(get_current_user),
    user=Depends(admin_only),
):
    try:
        return await DepartmentService.update(
            department_id,
            data,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.delete("/{department_id}")
async def delete_department(
    department_id: str,
    current_user=Depends(get_current_user),
    user=Depends(admin_only),
):
    try:
        return await DepartmentService.delete(
            department_id,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )