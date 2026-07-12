from datetime import datetime

from app.models.maintenance import Maintenance
from app.repositories.asset_repository import AssetRepository
from app.repositories.maintenance_repository import MaintenanceRepository
from app.repositories.user_repository import UserRepository
from app.utils.audit import log_audit


class MaintenanceService:

    @staticmethod
    async def create(data, current_user):

        asset = await AssetRepository.get_by_id(
            data.asset_id
        )

        if asset is None:
            raise ValueError("Asset not found")

        if data.assigned_to:

            technician = await UserRepository.get_user_by_id(
                data.assigned_to
            )

            if technician is None:
                raise ValueError("Assigned user not found")

        maintenance = Maintenance(
            **data.model_dump(),
            reported_by=str(current_user["_id"]),
        )

        created = await MaintenanceRepository.create(
            maintenance.model_dump()
        )

        await AssetRepository.update(
            data.asset_id,
            {
                "status": "Under Maintenance",
                "updated_at": datetime.utcnow(),
            },
        )

        await log_audit(
            current_user=current_user,
            action="CREATE_MAINTENANCE",
            module="Maintenance",
            reference_id=str(created["_id"]),
            details={
                "asset_id": created["asset_id"],
                "issue": created["issue"],
            },
        )

        created["id"] = str(created["_id"])
        del created["_id"]

        return created

    @staticmethod
    async def get_all():

        maintenances = await MaintenanceRepository.get_all()

        for maintenance in maintenances:
            maintenance["id"] = str(maintenance["_id"])
            del maintenance["_id"]

        return maintenances

    @staticmethod
    async def get_by_id(
        maintenance_id: str,
    ):

        maintenance = await MaintenanceRepository.get_by_id(
            maintenance_id
        )

        if maintenance is None:
            raise ValueError(
                "Maintenance record not found"
            )

        maintenance["id"] = str(maintenance["_id"])
        del maintenance["_id"]

        return maintenance

    @staticmethod
    async def get_by_asset(asset_id: str):

        maintenances = await MaintenanceRepository.get_by_asset(
            asset_id
        )

        for maintenance in maintenances:
            maintenance["id"] = str(maintenance["_id"])
            del maintenance["_id"]

        return maintenances

    @staticmethod
    async def get_by_status(status: str):

        maintenances = await MaintenanceRepository.get_by_status(
            status
        )

        for maintenance in maintenances:
            maintenance["id"] = str(maintenance["_id"])
            del maintenance["_id"]

        return maintenances

    @staticmethod
    async def update(
        maintenance_id: str,
        data,
        current_user,
    ):

        maintenance = await MaintenanceRepository.get_by_id(
            maintenance_id
        )

        if maintenance is None:
            raise ValueError(
                "Maintenance record not found"
            )

        if data.assigned_to is not None:

            technician = await UserRepository.get_user_by_id(
                data.assigned_to
            )

            if technician is None:
                raise ValueError(
                    "Assigned user not found"
                )

        update_data = data.model_dump(
            exclude_unset=True
        )

        update_data["updated_at"] = datetime.utcnow()

        updated = await MaintenanceRepository.update(
            maintenance_id,
            update_data,
        )

        await log_audit(
            current_user=current_user,
            action="UPDATE_MAINTENANCE",
            module="Maintenance",
            reference_id=maintenance_id,
            details={
                "asset_id": updated["asset_id"],
                "status": updated["status"],
            },
        )

        updated["id"] = str(updated["_id"])
        del updated["_id"]

        return updated

    @staticmethod
    async def complete(
        maintenance_id: str,
        remarks: str | None = None,
        current_user=None,
    ):

        maintenance = await MaintenanceRepository.get_by_id(
            maintenance_id
        )

        if maintenance is None:
            raise ValueError(
                "Maintenance record not found"
            )

        if maintenance["status"] == "Completed":
            raise ValueError(
                "Maintenance already completed"
            )

        updated = await MaintenanceRepository.update(
            maintenance_id,
            {
                "status": "Completed",
                "completed_date": datetime.utcnow(),
                "remarks": remarks,
                "updated_at": datetime.utcnow(),
            },
        )

        await AssetRepository.update(
            maintenance["asset_id"],
            {
                "status": "Available",
                "updated_at": datetime.utcnow(),
            },
        )

        await log_audit(
            current_user=current_user,
            action="COMPLETE_MAINTENANCE",
            module="Maintenance",
            reference_id=maintenance_id,
            details={
                "asset_id": maintenance["asset_id"],
            },
        )

        updated["id"] = str(updated["_id"])
        del updated["_id"]

        return updated

    @staticmethod
    async def delete(
        maintenance_id: str,
        current_user,
    ):

        maintenance = await MaintenanceRepository.get_by_id(
            maintenance_id
        )

        if maintenance is None:
            raise ValueError(
                "Maintenance record not found"
            )

        await MaintenanceRepository.delete(
            maintenance_id
        )

        await log_audit(
            current_user=current_user,
            action="DELETE_MAINTENANCE",
            module="Maintenance",
            reference_id=maintenance_id,
            details={
                "asset_id": maintenance["asset_id"],
            },
        )

        return {
            "message": "Maintenance record deleted successfully"
        }