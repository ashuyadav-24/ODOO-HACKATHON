from app.models.audit import Audit
from app.repositories.audit_repository import AuditRepository


class AuditService:

    @staticmethod
    async def create(
        user_id: str,
        action: str,
        module: str,
        reference_id: str | None = None,
        details: dict | None = None,
    ):

        audit = Audit(
            user_id=user_id,
            action=action,
            module=module,
            reference_id=reference_id,
            details=details or {},
        )

        created = await AuditRepository.create(
            audit.model_dump()
        )

        created["id"] = str(created["_id"])
        del created["_id"]

        return created

    @staticmethod
    async def get_all():

        audits = await AuditRepository.get_all()

        for audit in audits:
            audit["id"] = str(audit["_id"])
            del audit["_id"]

        return audits

    @staticmethod
    async def get_by_id(audit_id: str):

        audit = await AuditRepository.get_by_id(
            audit_id
        )

        if audit is None:
            raise ValueError("Audit record not found")

        audit["id"] = str(audit["_id"])
        del audit["_id"]

        return audit

    @staticmethod
    async def get_by_user(user_id: str):

        audits = await AuditRepository.get_by_user(
            user_id
        )

        for audit in audits:
            audit["id"] = str(audit["_id"])
            del audit["_id"]

        return audits

    @staticmethod
    async def get_by_module(module: str):

        audits = await AuditRepository.get_by_module(
            module
        )

        for audit in audits:
            audit["id"] = str(audit["_id"])
            del audit["_id"]

        return audits

    @staticmethod
    async def get_by_action(action: str):

        audits = await AuditRepository.get_by_action(
            action
        )

        for audit in audits:
            audit["id"] = str(audit["_id"])
            del audit["_id"]

        return audits

    @staticmethod
    async def delete(audit_id: str):

        audit = await AuditRepository.get_by_id(
            audit_id
        )

        if audit is None:
            raise ValueError("Audit record not found")

        await AuditRepository.delete(
            audit_id
        )

        return {
            "message": "Audit record deleted successfully"
        }