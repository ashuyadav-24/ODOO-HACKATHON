from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import RoleChecker, get_current_user
from app.services.audit_service import AuditService

router = APIRouter(
    prefix="/audits",
    tags=["Audits"],
)

admin_only = RoleChecker(["admin"])


@router.get("")
async def get_all_audits(
    current_user=Depends(get_current_user),
    user=Depends(admin_only),
):
    return await AuditService.get_all()


@router.get("/user/{user_id}")
async def get_user_audits(
    user_id: str,
    current_user=Depends(get_current_user),
    user=Depends(admin_only),
):
    return await AuditService.get_by_user(
        user_id
    )


@router.get("/module/{module}")
async def get_module_audits(
    module: str,
    current_user=Depends(get_current_user),
    user=Depends(admin_only),
):
    return await AuditService.get_by_module(
        module
    )


@router.get("/action/{action}")
async def get_action_audits(
    action: str,
    current_user=Depends(get_current_user),
    user=Depends(admin_only),
):
    return await AuditService.get_by_action(
        action
    )


@router.get("/{audit_id}")
async def get_audit(
    audit_id: str,
    current_user=Depends(get_current_user),
    user=Depends(admin_only),
):
    try:
        return await AuditService.get_by_id(
            audit_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.delete("/{audit_id}")
async def delete_audit(
    audit_id: str,
    current_user=Depends(get_current_user),
    user=Depends(admin_only),
):
    try:
        return await AuditService.delete(
            audit_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )