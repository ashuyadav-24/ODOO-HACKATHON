from app.services.audit_service import AuditService


async def log_audit(
    current_user,
    action: str,
    module: str,
    reference_id: str,
    details: dict,
):
    await AuditService.create(
        user_id=str(current_user["_id"]),
        action=action,
        module=module,
        reference_id=reference_id,
        details=details,
    )