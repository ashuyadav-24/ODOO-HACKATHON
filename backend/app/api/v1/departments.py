from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import RoleChecker
from app.schemas.department import DepartmentCreate, DepartmentUpdate
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
    user=Depends(admin_only),
):
    try:
        return await DepartmentService.create(data)

    except ValueError as e:
        raise HTTPException(
            status_code=400,
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
            status_code=404,
            detail=str(e),
        )


@router.put("/{department_id}")
async def update_department(
    department_id: str,
    data: DepartmentUpdate,
    user=Depends(admin_only),
):

    try:
        return await DepartmentService.update(
            department_id,
            data,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.delete("/{department_id}")
async def delete_department(
    department_id: str,
    user=Depends(admin_only),
):

    try:
        return await DepartmentService.delete(
            department_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )