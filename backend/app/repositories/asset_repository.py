from bson import ObjectId

from app.database.mongodb import get_database


class AssetRepository:

    @staticmethod
    async def create(asset: dict):
        db = get_database()

        result = await db.assets.insert_one(asset)

        return await db.assets.find_one(
            {
                "_id": result.inserted_id
            }
        )

    @staticmethod
    async def get_all():
        db = get_database()

        assets = []

        async for asset in db.assets.find():
            assets.append(asset)

        return assets

    @staticmethod
    async def get_by_id(asset_id: str):
        db = get_database()

        return await db.assets.find_one(
            {
                "_id": ObjectId(asset_id)
            }
        )

    @staticmethod
    async def get_by_asset_tag(asset_tag: str):
        db = get_database()

        return await db.assets.find_one(
            {
                "asset_tag": asset_tag
            }
        )

    @staticmethod
    async def get_by_serial_number(serial_number: str):
        db = get_database()

        return await db.assets.find_one(
            {
                "serial_number": serial_number
            }
        )

    @staticmethod
    async def update(asset_id: str, data: dict):
        db = get_database()

        await db.assets.update_one(
            {
                "_id": ObjectId(asset_id)
            },
            {
                "$set": data
            }
        )

        return await db.assets.find_one(
            {
                "_id": ObjectId(asset_id)
            }
        )

    @staticmethod
    async def delete(asset_id: str):
        db = get_database()

        return await db.assets.delete_one(
            {
                "_id": ObjectId(asset_id)
            }
        )

    @staticmethod
    async def search(keyword: str):
        db = get_database()

        assets = []

        query = {
            "$or": [
                {
                    "asset_name": {
                        "$regex": keyword,
                        "$options": "i"
                    }
                },
                {
                    "asset_tag": {
                        "$regex": keyword,
                        "$options": "i"
                    }
                },
                {
                    "serial_number": {
                        "$regex": keyword,
                        "$options": "i"
                    }
                },
                {
                    "location": {
                        "$regex": keyword,
                        "$options": "i"
                    }
                }
            ]
        }

        async for asset in db.assets.find(query):
            assets.append(asset)

        return assets

    @staticmethod
    async def get_by_status(status: str):
        db = get_database()

        assets = []

        async for asset in db.assets.find(
            {
                "status": status
            }
        ):
            assets.append(asset)

        return assets

    @staticmethod
    async def get_by_department(department_id: str):
        db = get_database()

        assets = []

        async for asset in db.assets.find(
            {
                "department_id": department_id
            }
        ):
            assets.append(asset)

        return assets

    @staticmethod
    async def get_by_category(category_id: str):
        db = get_database()

        assets = []

        async for asset in db.assets.find(
            {
                "category_id": category_id
            }
        ):
            assets.append(asset)

        return assets