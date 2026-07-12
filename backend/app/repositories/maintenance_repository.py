from bson import ObjectId

from app.database.mongodb import get_database


class MaintenanceRepository:

    @staticmethod
    async def create(maintenance: dict):
        db = get_database()

        result = await db.maintenance.insert_one(maintenance)

        return await db.maintenance.find_one(
            {
                "_id": result.inserted_id
            }
        )

    @staticmethod
    async def get_all():
        db = get_database()

        maintenances = []

        async for maintenance in db.maintenance.find():
            maintenances.append(maintenance)

        return maintenances

    @staticmethod
    async def get_by_id(maintenance_id: str):
        db = get_database()

        return await db.maintenance.find_one(
            {
                "_id": ObjectId(maintenance_id)
            }
        )

    @staticmethod
    async def get_by_asset(asset_id: str):
        db = get_database()

        maintenances = []

        async for maintenance in db.maintenance.find(
            {
                "asset_id": asset_id
            }
        ):
            maintenances.append(maintenance)

        return maintenances

    @staticmethod
    async def get_by_status(status: str):
        db = get_database()

        maintenances = []

        async for maintenance in db.maintenance.find(
            {
                "status": status
            }
        ):
            maintenances.append(maintenance)

        return maintenances

    @staticmethod
    async def update(maintenance_id: str, data: dict):
        db = get_database()

        await db.maintenance.update_one(
            {
                "_id": ObjectId(maintenance_id)
            },
            {
                "$set": data
            }
        )

        return await db.maintenance.find_one(
            {
                "_id": ObjectId(maintenance_id)
            }
        )

    @staticmethod
    async def delete(maintenance_id: str):
        db = get_database()

        return await db.maintenance.delete_one(
            {
                "_id": ObjectId(maintenance_id)
            }
        )
