from bson import ObjectId

from app.database.mongodb import get_database


class AllocationRepository:

    @staticmethod
    async def create(allocation: dict):
        db = get_database()

        result = await db.allocations.insert_one(allocation)

        return await db.allocations.find_one(
            {
                "_id": result.inserted_id
            }
        )

    @staticmethod
    async def get_all():
        db = get_database()

        allocations = []

        async for allocation in db.allocations.find():
            allocations.append(allocation)

        return allocations

    @staticmethod
    async def get_by_id(allocation_id: str):
        db = get_database()

        return await db.allocations.find_one(
            {
                "_id": ObjectId(allocation_id)
            }
        )

    @staticmethod
    async def get_active_by_asset(asset_id: str):
        db = get_database()

        return await db.allocations.find_one(
            {
                "asset_id": asset_id,
                "status": "Allocated"
            }
        )

    @staticmethod
    async def get_by_user(user_id: str):
        db = get_database()

        allocations = []

        async for allocation in db.allocations.find(
            {
                "user_id": user_id
            }
        ):
            allocations.append(allocation)

        return allocations

    @staticmethod
    async def get_by_asset(asset_id: str):
        db = get_database()

        allocations = []

        async for allocation in db.allocations.find(
            {
                "asset_id": asset_id
            }
        ):
            allocations.append(allocation)

        return allocations

    @staticmethod
    async def update(allocation_id: str, data: dict):
        db = get_database()

        await db.allocations.update_one(
            {
                "_id": ObjectId(allocation_id)
            },
            {
                "$set": data
            }
        )

        return await db.allocations.find_one(
            {
                "_id": ObjectId(allocation_id)
            }
        )

    @staticmethod
    async def delete(allocation_id: str):
        db = get_database()

        return await db.allocations.delete_one(
            {
                "_id": ObjectId(allocation_id)
            }
        )