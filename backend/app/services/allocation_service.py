from datetime import datetime

from app.models.allocation import Allocation
from app.repositories.allocation_repository import AllocationRepository
from app.repositories.asset_repository import AssetRepository
from app.repositories.user_repository import UserRepository


class AllocationService:

    @staticmethod
    async def create(data, current_user):

        asset = await AssetRepository.get_by_id(
            data.asset_id
        )

        if asset is None:
            raise ValueError("Asset not found")

        user = await UserRepository.get_user_by_id(
            data.user_id
        )

        if user is None:
            raise ValueError("User not found")

        if asset["status"] != "Available":
            raise ValueError("Asset is not available")

        active = await AllocationRepository.get_active_by_asset(
            data.asset_id
        )

        if active:
            raise ValueError("Asset is already allocated")

        allocation = Allocation(
            **data.model_dump(),
            allocated_by=str(current_user["_id"]),
        )

        created = await AllocationRepository.create(
            allocation.model_dump()
        )

        await AssetRepository.update(
            data.asset_id,
            {
                "status": "Allocated",
                "updated_at": datetime.utcnow(),
            },
        )

        created["id"] = str(created["_id"])
        del created["_id"]

        return created

    @staticmethod
    async def get_all():

        allocations = await AllocationRepository.get_all()

        for allocation in allocations:
            allocation["id"] = str(allocation["_id"])
            del allocation["_id"]

        return allocations

    @staticmethod
    async def get_by_id(allocation_id: str):

        allocation = await AllocationRepository.get_by_id(
            allocation_id
        )

        if allocation is None:
            raise ValueError("Allocation not found")

        allocation["id"] = str(allocation["_id"])
        del allocation["_id"]

        return allocation

    @staticmethod
    async def get_by_user(user_id: str):

        allocations = await AllocationRepository.get_by_user(
            user_id
        )

        for allocation in allocations:
            allocation["id"] = str(allocation["_id"])
            del allocation["_id"]

        return allocations

    @staticmethod
    async def get_by_asset(asset_id: str):

        allocations = await AllocationRepository.get_by_asset(
            asset_id
        )

        for allocation in allocations:
            allocation["id"] = str(allocation["_id"])
            del allocation["_id"]

        return allocations

    @staticmethod
    async def return_asset(
        allocation_id: str,
        remarks: str | None = None,
    ):

        allocation = await AllocationRepository.get_by_id(
            allocation_id
        )

        if allocation is None:
            raise ValueError("Allocation not found")

        if allocation["status"] == "Returned":
            raise ValueError("Asset already returned")

        updated = await AllocationRepository.update(
            allocation_id,
            {
                "status": "Returned",
                "returned_at": datetime.utcnow(),
                "remarks": remarks,
            },
        )

        await AssetRepository.update(
            allocation["asset_id"],
            {
                "status": "Available",
                "updated_at": datetime.utcnow(),
            },
        )

        updated["id"] = str(updated["_id"])
        del updated["_id"]

        return updated

    @staticmethod
    async def update(
        allocation_id: str,
        data,
    ):

        allocation = await AllocationRepository.get_by_id(
            allocation_id
        )

        if allocation is None:
            raise ValueError("Allocation not found")

        update_data = data.model_dump(exclude_unset=True)

        updated = await AllocationRepository.update(
            allocation_id,
            update_data,
        )

        updated["id"] = str(updated["_id"])
        del updated["_id"]

        return updated

    @staticmethod
    async def delete(allocation_id: str):

        allocation = await AllocationRepository.get_by_id(
            allocation_id
        )

        if allocation is None:
            raise ValueError("Allocation not found")

        await AllocationRepository.delete(allocation_id)

        return {
            "message": "Allocation deleted successfully"
        }