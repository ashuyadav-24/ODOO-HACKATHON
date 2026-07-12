from datetime import datetime

from app.models.asset import Asset
from app.repositories.asset_repository import AssetRepository
from app.repositories.category_repository import CategoryRepository
from app.repositories.department_repository import DepartmentRepository
from app.services.audit_service import AuditService
from app.utils.asset_tag import generate_asset_tag
from app.utils.audit import log_audit

class AssetService:

    @staticmethod
    async def create(data, current_user):

        serial = await AssetRepository.get_by_serial_number(
            data.serial_number
        )

        if serial:
            raise ValueError("Serial number already exists")

        department = await DepartmentRepository.get_by_id(
            data.department_id
        )

        if department is None:
            raise ValueError("Department not found")

        category = await CategoryRepository.get_category_by_id(
            data.category_id
        )

        if category is None:
            raise ValueError("Category not found")

        asset = Asset(
            **data.model_dump(),
            asset_tag=await generate_asset_tag(),
            created_by=str(current_user["_id"]),
        )

        created = await AssetRepository.create(
            asset.model_dump()
        )
        
        await log_audit(
            current_user=current_user,
            action="CREATE_ASSET",
            module="Assets",
            reference_id=str(created["_id"]),
            details={
                "asset_name": created["asset_name"],
                "asset_tag": created["asset_tag"],
            },
        )

        await AuditService.create(
            user_id=str(current_user["_id"]),
            action="CREATE_ASSET",
            module="Assets",
            reference_id=str(created["_id"]),
            details={
                "asset_name": created["asset_name"],
                "asset_tag": created["asset_tag"],
                "department_id": created["department_id"],
                "category_id": created["category_id"],
            },
        )

        created["id"] = str(created["_id"])
        del created["_id"]

        return created


    @staticmethod
    async def get_all():

        assets = await AssetRepository.get_all()

        for asset in assets:
            asset["id"] = str(asset["_id"])
            del asset["_id"]

        return assets

    @staticmethod
    async def get_by_id(asset_id: str):

        asset = await AssetRepository.get_by_id(asset_id)

        if asset is None:
            raise ValueError("Asset not found")

        asset["id"] = str(asset["_id"])
        del asset["_id"]

        return asset

    @staticmethod
    async def get_by_asset_tag(asset_tag: str):

        asset = await AssetRepository.get_by_asset_tag(asset_tag)

        if asset is None:
            raise ValueError("Asset not found")

        asset["id"] = str(asset["_id"])
        del asset["_id"]

        return asset

    @staticmethod
    async def update(asset_id: str, data, current_user):

        asset = await AssetRepository.get_by_id(asset_id)

        if asset is None:
            raise ValueError("Asset not found")

        if data.serial_number is not None:
            existing = await AssetRepository.get_by_serial_number(
                data.serial_number
            )

            if existing and str(existing["_id"]) != asset_id:
                raise ValueError("Serial number already exists")

        if data.department_id is not None:
            department = await DepartmentRepository.get_by_id(
                data.department_id
            )

            if department is None:
                raise ValueError("Department not found")

        if data.category_id is not None:
            category = await CategoryRepository.get_category_by_id(
                data.category_id
            )

            if category is None:
                raise ValueError("Category not found")

        update_data = data.model_dump(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()

        updated = await AssetRepository.update(
            asset_id,
            update_data,
        )
        
        await log_audit(
            current_user=current_user,
            action="UPDATE_ASSET",
            module="Assets",
            reference_id=asset_id,
            details={
                "asset_name": updated["asset_name"],
                "asset_tag": updated["asset_tag"],
            },
        )

        await AuditService.create(
            user_id=str(current_user["_id"]),
            action="UPDATE_ASSET",
            module="Assets",
            reference_id=str(updated["_id"]),
            details={
                "asset_name": updated["asset_name"],
                "asset_tag": updated["asset_tag"],
            },
        )

        updated["id"] = str(updated["_id"])
        del updated["_id"]

        return updated

    @staticmethod
    async def delete(asset_id: str, current_user):

        asset = await AssetRepository.get_by_id(asset_id)

        if asset is None:
            raise ValueError("Asset not found")

        await AssetRepository.delete(asset_id)

        await AuditService.create(
            user_id=str(current_user["_id"]),
            action="DELETE_ASSET",
            module="Assets",
            reference_id=asset_id,
            details={
                "asset_name": asset["asset_name"],
                "asset_tag": asset["asset_tag"],
            },
        )
        
        await log_audit(
            current_user=current_user,
            action="DELETE_ASSET",
            module="Assets",
            reference_id=asset_id,
            details={
                "asset_name": asset["asset_name"],
                "asset_tag": asset["asset_tag"],
            },
        )

        return {
            "message": "Asset deleted successfully"
        }

    @staticmethod
    async def search(keyword: str):

        assets = await AssetRepository.search(keyword)

        for asset in assets:
            asset["id"] = str(asset["_id"])
            del asset["_id"]

        return assets

    @staticmethod
    async def get_by_status(status: str):

        assets = await AssetRepository.get_by_status(status)

        for asset in assets:
            asset["id"] = str(asset["_id"])
            del asset["_id"]

        return assets

    @staticmethod
    async def get_by_department(department_id: str):

        assets = await AssetRepository.get_by_department(
            department_id
        )

        for asset in assets:
            asset["id"] = str(asset["_id"])
            del asset["_id"]

        return assets

    @staticmethod
    async def get_by_category(category_id: str):

        assets = await AssetRepository.get_by_category(
            category_id
        )

        for asset in assets:
            asset["id"] = str(asset["_id"])
            del asset["_id"]

        return assets